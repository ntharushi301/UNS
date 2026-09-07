from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import User, Department, Representation


representations_bp = Blueprint(
    "representations",
    __name__,
    url_prefix="/api/representations"
)


# ============================================================
# HELPERS
# ============================================================

def get_current_user():
    user_id = get_jwt_identity()

    if not user_id:
        return None

    return db.session.get(User, int(user_id))


def serialize_representation(rep):
    return {
        "id": rep.id,

        "user": {
            "id": rep.user.id,
            "name": rep.user.name,
            "email": rep.user.email
        },

        "department": (
            {
                "id": rep.department.id,
                "code": rep.department.code,
                "name": rep.department.name
            }
            if rep.department
            else None
        ),

        "year_level": rep.year_level,

        "representation_type": rep.representation_type,

        "gender": rep.gender
    }


# ============================================================
# CREATE REPRESENTATION
# ============================================================

@representations_bp.post("")
@jwt_required()
def create_representation():

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    # Only REPRESENTATIVE users can create
    # a representation record.

    if not current_user.role:
        return jsonify({
            "error": "User role not found"
        }), 400

    if current_user.role.name != "REPRESENTATIVE":
        return jsonify({
            "error": "Representative role required"
        }), 403

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    department_code = data.get("department")

    year_level = data.get("year_level")

    representation_type = data.get(
        "representation_type"
    )

    gender = data.get("gender")

    # --------------------------------------------------------
    # Validate department
    # --------------------------------------------------------

    if not department_code:
        return jsonify({
            "error": "Department is required"
        }), 400

    department = Department.query.filter_by(
        code=str(
            department_code
        ).strip().upper()
    ).first()

    if not department:
        return jsonify({
            "error": "Invalid department"
        }), 400

    # --------------------------------------------------------
    # Validate year
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Validate representation type
    # --------------------------------------------------------

    if not representation_type:
        return jsonify({
            "error": "representation_type is required"
        }), 400

    representation_type = str(
        representation_type
    ).strip().upper()

    # --------------------------------------------------------
    # Prevent duplicate representation
    # --------------------------------------------------------

    existing = Representation.query.filter_by(
        user_id=current_user.id,
        department_id=department.id,
        year_level=year_level
    ).first()

    if existing:
        return jsonify({
            "error": "You already have a representation for this department and year"
        }), 409

    # --------------------------------------------------------
    # Create
    # --------------------------------------------------------

    representation = Representation(
        user_id=current_user.id,
        department_id=department.id,
        year_level=year_level,
        representation_type=representation_type,
        gender=gender
    )

    db.session.add(representation)
    db.session.commit()

    return jsonify({
        "message": "Representation created successfully",
        "representation": serialize_representation(
            representation
        )
    }), 201


# ============================================================
# GET ALL REPRESENTATIONS
# ============================================================

@representations_bp.get("")
@jwt_required()
def get_representations():

    representations = Representation.query.order_by(
        Representation.department_id.asc(),
        Representation.year_level.asc()
    ).all()

    return jsonify({
        "representations": [
            serialize_representation(rep)
            for rep in representations
        ]
    }), 200


# ============================================================
# GET SINGLE REPRESENTATION
# ============================================================

@representations_bp.get("/<int:representation_id>")
@jwt_required()
def get_representation(representation_id):

    representation = db.session.get(
        Representation,
        representation_id
    )

    if not representation:
        return jsonify({
            "error": "Representation not found"
        }), 404

    return jsonify({
        "representation": serialize_representation(
            representation
        )
    }), 200


# ============================================================
# UPDATE REPRESENTATION
# ============================================================

@representations_bp.put("/<int:representation_id>")
@jwt_required()
def update_representation(representation_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    representation = db.session.get(
        Representation,
        representation_id
    )

    if not representation:
        return jsonify({
            "error": "Representation not found"
        }), 404

    # Only the owner can update their representation.

    if representation.user_id != current_user.id:
        return jsonify({
            "error": (
                "You do not have permission to "
                "update this representation"
            )
        }), 403

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    # --------------------------------------------------------
    # Department
    # --------------------------------------------------------

    if "department" in data:

        department = Department.query.filter_by(
            code=str(
                data["department"]
            ).strip().upper()
        ).first()

        if not department:
            return jsonify({
                "error": "Invalid department"
            }), 400

        representation.department_id = department.id

    # --------------------------------------------------------
    # Year
    # --------------------------------------------------------

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

        representation.year_level = year_level

    # --------------------------------------------------------
    # Representation type
    # --------------------------------------------------------

    if "representation_type" in data:

        if not data["representation_type"]:
            return jsonify({
                "error": (
                    "representation_type "
                    "cannot be empty"
                )
            }), 400

        representation.representation_type = str(
            data["representation_type"]
        ).strip().upper()

    # --------------------------------------------------------
    # Gender
    # --------------------------------------------------------

    if "gender" in data:
        representation.gender = data["gender"]

    db.session.commit()

    return jsonify({
        "message": "Representation updated successfully",
        "representation": serialize_representation(
            representation
        )
    }), 200


# ============================================================
# DELETE REPRESENTATION
# ============================================================

@representations_bp.delete("/<int:representation_id>")
@jwt_required()
def delete_representation(representation_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    representation = db.session.get(
        Representation,
        representation_id
    )

    if not representation:
        return jsonify({
            "error": "Representation not found"
        }), 404

    if representation.user_id != current_user.id:
        return jsonify({
            "error": (
                "You do not have permission to "
                "delete this representation"
            )
        }), 403

    db.session.delete(representation)
    db.session.commit()

    return jsonify({
        "message": "Representation deleted successfully"
    }), 200