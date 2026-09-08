from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import User, Role, Department, Batch
from app.services.permissions import is_admin


users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/users"
)


def get_current_user():
    user_id = get_jwt_identity()

    if not user_id:
        return None

    return db.session.get(
        User,
        int(user_id)
    )


def serialize_user(user):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "registration_number": user.registration_number,
        "role": user.role.name if user.role else None,
        "department": (
            user.department.code
            if user.department
            else None
        ),
        "batch": (
            user.batch.name
            if user.batch
            else None
        ),
        "year": (
            user.batch.year_level
            if user.batch
            else None
        )
    }


# ============================================================
# GET ALL USERS
# ============================================================

@users_bp.get("")
@jwt_required()
def get_users():

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not is_admin(current_user):
        return jsonify({
            "error": "Administrator permission required"
        }), 403

    users = User.query.order_by(
        User.id.asc()
    ).all()

    return jsonify({
        "users": [
            serialize_user(user)
            for user in users
        ]
    }), 200


# ============================================================
# GET SINGLE USER
# ============================================================

@users_bp.get("/<int:user_id>")
@jwt_required()
def get_user(user_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    # Users can view themselves.
    # Admins can view anyone.

    if (
        current_user.id != user.id
        and not is_admin(current_user)
    ):
        return jsonify({
            "error": "You do not have permission to view this user"
        }), 403

    return jsonify({
        "user": serialize_user(user)
    }), 200


# ============================================================
# UPDATE USER
# ============================================================

@users_bp.put("/<int:user_id>")
@jwt_required()
def update_user(user_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    # Only admin or the user themselves
    # can update basic profile information.

    if (
        current_user.id != user.id
        and not is_admin(current_user)
    ):
        return jsonify({
            "error": "You do not have permission to update this user"
        }), 403

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    if "name" in data:

        name = data["name"]

        if not name or not name.strip():
            return jsonify({
                "error": "Name cannot be empty"
            }), 400

        user.name = name.strip()

    # --------------------------------------------------------
    # Admin-only organizational changes
    # --------------------------------------------------------

    if is_admin(current_user):

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

            user.department_id = department.id

        if "batch_id" in data:

            batch_id = data["batch_id"]

            batch = db.session.get(
                Batch,
                batch_id
            )

            if not batch:
                return jsonify({
                    "error": "Invalid batch"
                }), 400

            user.batch_id = batch.id

    db.session.commit()

    return jsonify({
        "message": "User updated successfully",
        "user": serialize_user(user)
    }), 200


# ============================================================
# CHANGE ROLE
# ============================================================

@users_bp.put("/<int:user_id>/role")
@jwt_required()
def change_role(user_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not is_admin(current_user):
        return jsonify({
            "error": "Administrator permission required"
        }), 403

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    role_name = data.get("role")

    if not role_name:
        return jsonify({
            "error": "Role is required"
        }), 400

    role = Role.query.filter_by(
        name=str(role_name).strip().upper()
    ).first()

    if not role:
        return jsonify({
            "error": "Invalid role"
        }), 400

    user.role_id = role.id

    db.session.commit()

    return jsonify({
        "message": "User role updated successfully",
        "user": serialize_user(user)
    }), 200


# ============================================================
# DELETE USER
# ============================================================

@users_bp.delete("/<int:user_id>")
@jwt_required()
def delete_user(user_id):

    current_user = get_current_user()

    if not current_user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not is_admin(current_user):
        return jsonify({
            "error": "Administrator permission required"
        }), 403

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    if user.id == current_user.id:
        return jsonify({
            "error": "You cannot delete your own administrator account"
        }), 400

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": "User deleted successfully"
    }), 200