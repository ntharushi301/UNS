from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.extensions import db
from app.models import Notice, NoticeAudience, User, Department
from app.services.permissions import (
    can_create_notice,
    can_delete_notice,
    can_edit_notice,
    can_view_notice,
)


notices_bp = Blueprint(
    "notices",
    __name__,
    url_prefix="/api/notices"
)


# ============================================================
# HELPERS
# ============================================================

def get_current_user():
    user_id = get_jwt_identity()

    if not user_id:
        return None

    return db.session.get(
        User,
        int(user_id)
    )


def serialize_notice(notice):
    return {
        "id": notice.id,
        "title": notice.title,
        "content": notice.content,
        "created_at": (
            notice.created_at.isoformat()
            if notice.created_at
            else None
        ),
        "updated_at": (
            notice.updated_at.isoformat()
            if notice.updated_at
            else None
        ),
        "author": {
            "id": notice.author.id,
            "name": notice.author.name,
            "role": notice.author.role.name
        },
        "audiences": [
            {
                "type": audience.audience_type,
                "department": (
                    audience.department.code
                    if audience.department
                    else None
                ),
                "year": audience.year_level
            }
            for audience in notice.audiences
        ]
    }


def validate_audience(audience_data):
    """
    Validate and resolve a notice audience.

    Supported types:

        ALL

        DEPARTMENT
        {
            "type": "DEPARTMENT",
            "department": "ICT"
        }

        YEAR
        {
            "type": "YEAR",
            "department": "ICT",
            "year": 2
        }
    """

    if not isinstance(audience_data, dict):
        return None, "Each audience must be an object"

    audience_type = audience_data.get("type")

    if not audience_type:
        return None, "Audience type is required"

    audience_type = audience_type.strip().upper()

    # --------------------------------------------------------
    # ALL
    # --------------------------------------------------------

    if audience_type == "ALL":

        return NoticeAudience(
            audience_type="ALL"
        ), None

    # --------------------------------------------------------
    # DEPARTMENT
    # --------------------------------------------------------

    if audience_type == "DEPARTMENT":

        department_code = audience_data.get(
            "department"
        )

        if not department_code:
            return None, (
                "Department is required for "
                "DEPARTMENT audience"
            )

        department = Department.query.filter_by(
            code=department_code.strip().upper()
        ).first()

        if not department:
            return None, "Invalid department"

        return NoticeAudience(
            audience_type="DEPARTMENT",
            department_id=department.id
        ), None

    # --------------------------------------------------------
    # YEAR
    # --------------------------------------------------------

    if audience_type == "YEAR":

        department_code = audience_data.get(
            "department"
        )

        year = audience_data.get(
            "year"
        )

        if not department_code:
            return None, (
                "Department is required for "
                "YEAR audience"
            )

        if year is None:
            return None, (
                "Year is required for "
                "YEAR audience"
            )

        try:
            year = int(year)
        except (TypeError, ValueError):
            return None, "Year must be a number"

        if year not in [1, 2, 3, 4]:
            return None, "Year must be between 1 and 4"

        department = Department.query.filter_by(
            code=department_code.strip().upper()
        ).first()

        if not department:
            return None, "Invalid department"

        return NoticeAudience(
            audience_type="YEAR",
            department_id=department.id,
            year_level=year
        ), None

    return None, (
        "Invalid audience type. "
        "Use ALL, DEPARTMENT, or YEAR"
    )


# ============================================================
# CREATE NOTICE
# ============================================================

@notices_bp.post("")
@jwt_required()
def create_notice():

    user = get_current_user()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not can_create_notice(user):
        return jsonify({
            "error": "You do not have permission to create notices"
        }), 403

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    title = data.get("title")
    content = data.get("content")
    audiences = data.get("audiences")

    if not title:
        return jsonify({
            "error": "Title is required"
        }), 400

    if not content:
        return jsonify({
            "error": "Content is required"
        }), 400

    if not audiences:
        return jsonify({
            "error": "At least one audience is required"
        }), 400

    if not isinstance(audiences, list):
        return jsonify({
            "error": "Audiences must be a list"
        }), 400

    # --------------------------------------------------------
    # Create notice
    # --------------------------------------------------------

    notice = Notice(
        title=title.strip(),
        content=content.strip(),
        author_id=user.id
    )

    db.session.add(notice)
    db.session.flush()

    # --------------------------------------------------------
    # Create audiences
    # --------------------------------------------------------

    for audience_data in audiences:

        audience, error = validate_audience(
            audience_data
        )

        if error:
            db.session.rollback()

            return jsonify({
                "error": error
            }), 400

        audience.notice_id = notice.id

        db.session.add(audience)

    db.session.commit()

    return jsonify({
        "message": "Notice created successfully",
        "notice": serialize_notice(notice)
    }), 201


# ============================================================
# GET NOTICES
# ============================================================

@notices_bp.get("")
@jwt_required()
def get_notices():

    user = get_current_user()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    notices = Notice.query.order_by(
        Notice.created_at.desc()
    ).all()

    visible_notices = [
        notice
        for notice in notices
        if can_view_notice(user, notice)
    ]

    return jsonify({
        "notices": [
            serialize_notice(notice)
            for notice in visible_notices
        ]
    }), 200


# ============================================================
# GET SINGLE NOTICE
# ============================================================

@notices_bp.get("/<int:notice_id>")
@jwt_required()
def get_notice(notice_id):

    user = get_current_user()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    notice = db.session.get(
        Notice,
        notice_id
    )

    if not notice:
        return jsonify({
            "error": "Notice not found"
        }), 404

    if not can_view_notice(user, notice):
        return jsonify({
            "error": "You do not have permission to view this notice"
        }), 403

    return jsonify({
        "notice": serialize_notice(notice)
    }), 200


# ============================================================
# UPDATE NOTICE
# ============================================================

@notices_bp.put("/<int:notice_id>")
@jwt_required()
def update_notice(notice_id):

    user = get_current_user()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    notice = db.session.get(
        Notice,
        notice_id
    )

    if not notice:
        return jsonify({
            "error": "Notice not found"
        }), 404

    if not can_edit_notice(user, notice):
        return jsonify({
            "error": "You do not have permission to edit this notice"
        }), 403

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    # --------------------------------------------------------
    # Update title
    # --------------------------------------------------------

    if "title" in data:

        if not data["title"]:
            return jsonify({
                "error": "Title cannot be empty"
            }), 400

        notice.title = data["title"].strip()

    # --------------------------------------------------------
    # Update content
    # --------------------------------------------------------

    if "content" in data:

        if not data["content"]:
            return jsonify({
                "error": "Content cannot be empty"
            }), 400

        notice.content = data["content"].strip()

    # --------------------------------------------------------
    # Update audiences
    # --------------------------------------------------------

    if "audiences" in data:

        audiences = data["audiences"]

        if not isinstance(audiences, list):
            return jsonify({
                "error": "Audiences must be a list"
            }), 400

        if not audiences:
            return jsonify({
                "error": "At least one audience is required"
            }), 400

        # Remove old audiences
        notice.audiences.clear()

        for audience_data in audiences:

            audience, error = validate_audience(
                audience_data
            )

            if error:
                db.session.rollback()

                return jsonify({
                    "error": error
                }), 400

            notice.audiences.append(
                audience
            )

    db.session.commit()

    return jsonify({
        "message": "Notice updated successfully",
        "notice": serialize_notice(notice)
    }), 200


# ============================================================
# DELETE NOTICE
# ============================================================

@notices_bp.delete("/<int:notice_id>")
@jwt_required()
def delete_notice(notice_id):

    user = get_current_user()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    notice = db.session.get(
        Notice,
        notice_id
    )

    if not notice:
        return jsonify({
            "error": "Notice not found"
        }), 404

    if not can_delete_notice(user, notice):
        return jsonify({
            "error": "You do not have permission to delete this notice"
        }), 403

    db.session.delete(notice)
    db.session.commit()

    return jsonify({
        "message": "Notice deleted successfully"
    }), 200