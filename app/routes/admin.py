from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import (
    User,
    Role,
    Department,
    Batch,
    AcademicYear,
    Notice,
    Representation,
    StudentAcademicHistory,
)


admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/api/admin"
)


def get_current_user():
    user_id = get_jwt_identity()

    if not user_id:
        return None

    return db.session.get(User, int(user_id))


def require_admin():
    user = get_current_user()

    if not user:
        return None, (
            jsonify({"error": "User not found"}),
            404
        )

    if not user.role or user.role.name != "ADMIN":
        return None, (
            jsonify({
                "error": "Administrator permission required"
            }),
            403
        )

    return user, None


# ============================================================
# DASHBOARD
# ============================================================

@admin_bp.get("/dashboard")
@jwt_required()
def dashboard():

    user, error = require_admin()

    if error:
        return error

    current_year = AcademicYear.query.order_by(
        AcademicYear.year.desc()
    ).first()

    role_counts = {}

    for role in Role.query.all():
        role_counts[role.name] = User.query.filter_by(
            role_id=role.id
        ).count()

    department_counts = {}

    for department in Department.query.all():
        department_counts[department.code] = User.query.filter_by(
            department_id=department.id
        ).count()

    return jsonify({
        "statistics": {
            "total_users": User.query.count(),

            "total_students": User.query.join(
                Role
            ).filter(
                Role.name == "STUDENT"
            ).count(),

            "total_staff": User.query.join(
                Role
            ).filter(
                Role.name != "STUDENT"
            ).count(),

            "total_representatives": User.query.join(
                Role
            ).filter(
                Role.name == "REPRESENTATIVE"
            ).count(),

            "total_departments": Department.query.count(),

            "total_batches": Batch.query.count(),

            "total_notices": Notice.query.count(),

            "total_representations": Representation.query.count(),

            "total_academic_history_records":
                StudentAcademicHistory.query.count()
        },

        "roles": role_counts,

        "departments": department_counts,

        "current_academic_year": (
            {
                "id": current_year.id,
                "year": current_year.year,
                "name": current_year.name
            }
            if current_year
            else None
        )
    }), 200


# ============================================================
# USERS
# ============================================================

@admin_bp.get("/users")
@jwt_required()
def users():

    user, error = require_admin()

    if error:
        return error

    users = User.query.order_by(
        User.id.asc()
    ).all()

    result = []

    for item in users:

        result.append({
            "id": item.id,
            "name": item.name,
            "email": item.email,
            "registration_number": item.registration_number,

            "role": (
                item.role.name
                if item.role
                else None
            ),

            "department": (
                item.department.code
                if item.department
                else None
            ),

            "batch": (
                item.batch.name
                if item.batch
                else None
            )
        })

    return jsonify({
        "users": result
    }), 200


# ============================================================
# ROLES
# ============================================================

@admin_bp.get("/roles")
@jwt_required()
def roles():

    user, error = require_admin()

    if error:
        return error

    roles = Role.query.order_by(
        Role.id.asc()
    ).all()

    return jsonify({
        "roles": [
            {
                "id": role.id,
                "name": role.name
            }
            for role in roles
        ]
    }), 200


# ============================================================
# RECENT NOTICES
# ============================================================

@admin_bp.get("/notices")
@jwt_required()
def notices():

    user, error = require_admin()

    if error:
        return error

    notices = Notice.query.order_by(
        Notice.created_at.desc()
    ).limit(50).all()

    result = []

    for notice in notices:

        result.append({
            "id": notice.id,
            "title": notice.title,
            "content": notice.content,

            "author": (
                {
                    "id": notice.author.id,
                    "name": notice.author.name,
                    "email": notice.author.email
                }
                if notice.author
                else None
            ),

            "created_at": (
                notice.created_at.isoformat()
                if notice.created_at
                else None
            )
        })

    return jsonify({
        "notices": result
    }), 200