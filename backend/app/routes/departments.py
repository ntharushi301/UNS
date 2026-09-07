from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models import Department, Batch


departments_bp = Blueprint(
    "departments",
    __name__,
    url_prefix="/api/departments"
)


def serialize_department(department):
    return {
        "id": department.id,
        "code": department.code,
        "name": department.name,
        "batches": [
            {
                "id": batch.id,
                "name": batch.name,
                "year": batch.year_level
            }
            for batch in sorted(
                department.batches,
                key=lambda batch: batch.year_level
            )
        ]
    }


# ============================================================
# GET ALL DEPARTMENTS
# ============================================================

@departments_bp.get("")
@jwt_required()
def get_departments():

    departments = Department.query.order_by(
        Department.code.asc()
    ).all()

    return jsonify({
        "departments": [
            serialize_department(department)
            for department in departments
        ]
    }), 200


# ============================================================
# GET SINGLE DEPARTMENT
# ============================================================

@departments_bp.get("/<int:department_id>")
@jwt_required()
def get_department(department_id):

    department = Department.query.get(
        department_id
    )

    if not department:
        return jsonify({
            "error": "Department not found"
        }), 404

    return jsonify({
        "department": serialize_department(
            department
        )
    }), 200


# ============================================================
# GET DEPARTMENT BATCHES
# ============================================================

@departments_bp.get("/<int:department_id>/batches")
@jwt_required()
def get_department_batches(department_id):

    department = Department.query.get(
        department_id
    )

    if not department:
        return jsonify({
            "error": "Department not found"
        }), 404

    batches = Batch.query.filter_by(
        department_id=department.id
    ).order_by(
        Batch.year_level.asc()
    ).all()

    return jsonify({
        "department": department.code,
        "batches": [
            {
                "id": batch.id,
                "name": batch.name,
                "year": batch.year_level
            }
            for batch in batches
        ]
    }), 200