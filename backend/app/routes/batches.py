from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models import Batch, User


batches_bp = Blueprint(
    "batches",
    __name__,
    url_prefix="/api/batches"
)


def serialize_batch(batch):
    return {
        "id": batch.id,
        "name": batch.name,
        "year": batch.year_level,
        "department": (
            batch.department.code
            if batch.department
            else None
        ),
        "academic_year": (
            batch.academic_year.name
            if batch.academic_year
            else None
        )
    }


# ============================================================
# GET ALL BATCHES
# ============================================================

@batches_bp.get("")
@jwt_required()
def get_batches():

    batches = Batch.query.order_by(
        Batch.department_id.asc(),
        Batch.year_level.asc()
    ).all()

    return jsonify({
        "batches": [
            serialize_batch(batch)
            for batch in batches
        ]
    }), 200


# ============================================================
# GET SINGLE BATCH
# ============================================================

@batches_bp.get("/<int:batch_id>")
@jwt_required()
def get_batch(batch_id):

    batch = Batch.query.get(batch_id)

    if not batch:
        return jsonify({
            "error": "Batch not found"
        }), 404

    return jsonify({
        "batch": serialize_batch(batch)
    }), 200


# ============================================================
# GET STUDENTS IN BATCH
# ============================================================

@batches_bp.get("/<int:batch_id>/students")
@jwt_required()
def get_batch_students(batch_id):

    batch = Batch.query.get(batch_id)

    if not batch:
        return jsonify({
            "error": "Batch not found"
        }), 404

    students = User.query.filter_by(
        batch_id=batch.id
    ).join(
        User.role
    ).filter(
        User.role.has(name="STUDENT")
    ).order_by(
        User.name.asc()
    ).all()

    return jsonify({
        "batch": serialize_batch(batch),
        "students": [
            {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "registration_number": (
                    student.registration_number
                )
            }
            for student in students
        ]
    }), 200