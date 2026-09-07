from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models import AcademicYear


academic_years_bp = Blueprint(
    "academic_years",
    __name__,
    url_prefix="/api/academic-years"
)


def serialize_academic_year(year):
    return {
        "id": year.id,
        "year": year.year,
        "name": year.name
    }


# ============================================================
# GET ALL ACADEMIC YEARS
# ============================================================

@academic_years_bp.get("")
@jwt_required()
def get_academic_years():

    years = AcademicYear.query.order_by(
        AcademicYear.year.desc()
    ).all()

    return jsonify({
        "academic_years": [
            serialize_academic_year(year)
            for year in years
        ]
    }), 200


# ============================================================
# GET CURRENT / LATEST ACADEMIC YEAR
# ============================================================

@academic_years_bp.get("/current")
@jwt_required()
def get_current_academic_year():

    year = AcademicYear.query.order_by(
        AcademicYear.year.desc()
    ).first()

    if not year:
        return jsonify({
            "error": "No academic year found"
        }), 404

    return jsonify({
        "academic_year": serialize_academic_year(year)
    }), 200


# ============================================================
# GET SINGLE ACADEMIC YEAR
# ============================================================

@academic_years_bp.get("/<int:year_id>")
@jwt_required()
def get_academic_year(year_id):

    year = AcademicYear.query.get(
        year_id
    )

    if not year:
        return jsonify({
            "error": "Academic year not found"
        }), 404

    return jsonify({
        "academic_year": serialize_academic_year(year)
    }), 200