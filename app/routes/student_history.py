from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import (
    User,
    Batch,
    AcademicYear,
    StudentAcademicHistory
)


student_history_bp = Blueprint(
    "student_history",
    __name__,
    url_prefix="/api/student-history"
)


# ============================================================
# HELPERS
# ============================================================

def get_current_user():
    user_id = get_jwt_identity()

    if not user_id:
        return None

    return db.session.get(User, int(user_id))


def serialize_history(history):
    return {
        "id": history.id,

        "student": {
            "id": history.user.id,
            "name": history.user.name,
            "email": history.user.email
        },

        "batch": {
            "id": history.batch.id,
            "name": history.batch.name,
            "year": history.batch.year_level
        },

        "academic_year": {
            "id": history.academic_year.id,
            "year": history.academic_year.year,
            "name": history.academic_year.name
        },

        "year_level": history.year_level
    }


# ============================================================
# GET CURRENT USER'S ACADEMIC HISTORY
# ============================================================

@student_history_bp.get("/me")
@jwt_required()
def get_my_history():

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    history = StudentAcademicHistory.query.filter_by(
        user_id=current_user.id
    ).order_by(
        StudentAcademicHistory.year_level.asc()
    ).all()

    return jsonify({
        "history": [
            serialize_history(item)
            for item in history
        ]
    }), 200


# ============================================================
# GET STUDENT HISTORY
# ============================================================

@student_history_bp.get("/<int:user_id>")
@jwt_required()
def get_student_history(user_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    # Students can only see their own history.
    # Staff/admin can be added to the permission service later.

    if current_user.id != user_id:
        if not current_user.role or current_user.role.name not in [
            "ADMIN",
            "DEAN",
            "LECTURER",
            "INSTRUCTOR",
            "AR"
        ]:
            return jsonify({
                "error": (
                    "You do not have permission "
                    "to view this student's history"
                )
            }), 403

    student = db.session.get(
        User,
        user_id
    )

    if not student:
        return jsonify({
            "error": "Student not found"
        }), 404

    history = StudentAcademicHistory.query.filter_by(
        user_id=student.id
    ).order_by(
        StudentAcademicHistory.year_level.asc()
    ).all()

    return jsonify({
        "student": {
            "id": student.id,
            "name": student.name,
            "email": student.email
        },
        "history": [
            serialize_history(item)
            for item in history
        ]
    }), 200


# ============================================================
# ADD ACADEMIC HISTORY
# ============================================================

@student_history_bp.post("/<int:user_id>")
@jwt_required()
def add_student_history(user_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not current_user.role or current_user.role.name not in [
        "ADMIN",
        "AR"
    ]:
        return jsonify({
            "error": (
                "Administrator or Academic Registrar "
                "permission required"
            )
        }), 403

    student = db.session.get(
        User,
        user_id
    )

    if not student:
        return jsonify({
            "error": "Student not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    batch_id = data.get("batch_id")
    academic_year_id = data.get("academic_year_id")
    year_level = data.get("year_level")

    if batch_id is None:
        return jsonify({
            "error": "batch_id is required"
        }), 400

    if academic_year_id is None:
        return jsonify({
            "error": "academic_year_id is required"
        }), 400

    if year_level is None:
        return jsonify({
            "error": "year_level is required"
        }), 400

    try:
        year_level = int(year_level)
    except (TypeError, ValueError):
        return jsonify({
            "error": "year_level must be a number"
        }), 400

    if year_level not in [1, 2, 3, 4]:
        return jsonify({
            "error": "year_level must be between 1 and 4"
        }), 400

    batch = db.session.get(
        Batch,
        batch_id
    )

    if not batch:
        return jsonify({
            "error": "Batch not found"
        }), 404

    academic_year = db.session.get(
        AcademicYear,
        academic_year_id
    )

    if not academic_year:
        return jsonify({
            "error": "Academic year not found"
        }), 404

    existing = StudentAcademicHistory.query.filter_by(
        user_id=student.id,
        academic_year_id=academic_year.id
    ).first()

    if existing:
        return jsonify({
            "error": (
                "Academic history already exists "
                "for this academic year"
            )
        }), 409

    history = StudentAcademicHistory(
        user_id=student.id,
        batch_id=batch.id,
        academic_year_id=academic_year.id,
        year_level=year_level
    )

    db.session.add(history)
    db.session.commit()

    return jsonify({
        "message": "Academic history added successfully",
        "history": serialize_history(history)
    }), 201


# ============================================================
# UPDATE ACADEMIC HISTORY
# ============================================================

@student_history_bp.put("/<int:history_id>")
@jwt_required()
def update_history(history_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not current_user.role or current_user.role.name not in [
        "ADMIN",
        "AR"
    ]:
        return jsonify({
            "error": (
                "Administrator or Academic Registrar "
                "permission required"
            )
        }), 403

    history = db.session.get(
        StudentAcademicHistory,
        history_id
    )

    if not history:
        return jsonify({
            "error": "Academic history not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    if "batch_id" in data:

        batch = db.session.get(
            Batch,
            data["batch_id"]
        )

        if not batch:
            return jsonify({
                "error": "Batch not found"
            }), 404

        history.batch_id = batch.id

    if "academic_year_id" in data:

        academic_year = db.session.get(
            AcademicYear,
            data["academic_year_id"]
        )

        if not academic_year:
            return jsonify({
                "error": "Academic year not found"
            }), 404

        history.academic_year_id = academic_year.id

    if "year_level" in data:

        try:
            year_level = int(
                data["year_level"]
            )
        except (TypeError, ValueError):
            return jsonify({
                "error": "year_level must be a number"
            }), 400

        if year_level not in [1, 2, 3, 4]:
            return jsonify({
                "error": "year_level must be between 1 and 4"
            }), 400

        history.year_level = year_level

    db.session.commit()

    return jsonify({
        "message": "Academic history updated successfully",
        "history": serialize_history(history)
    }), 200


# ============================================================
# DELETE ACADEMIC HISTORY
# ============================================================

@student_history_bp.delete("/<int:history_id>")
@jwt_required()
def delete_history(history_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not current_user.role or current_user.role.name not in [
        "ADMIN",
        "AR"
    ]:
        return jsonify({
            "error": (
                "Administrator or Academic Registrar "
                "permission required"
            )
        }), 403

    history = db.session.get(
        StudentAcademicHistory,
        history_id
    )

    if not history:
        return jsonify({
            "error": "Academic history not found"
        }), 404

    db.session.delete(history)
    db.session.commit()

    return jsonify({
        "message": "Academic history deleted successfully"
    }), 200