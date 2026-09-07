import re

from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
)

from app.extensions import db
from app.models import User, Role, Department, Batch


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


STUDENT_EMAIL_PATTERN = re.compile(
    r"^\d{4}[a-zA-Z]\d{5}@stu\.cmb\.ac\.lk$"
)


@auth_bp.post("/register")
def register():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    department_code = data.get("department")
    year_level = data.get("year")

    if not all([
        name,
        email,
        password,
        department_code,
        year_level
    ]):
        return jsonify({
            "error": "Name, email, password, department and year are required"
        }), 400

    email = email.strip().lower()
    department_code = department_code.strip().upper()

    # --------------------------------------------------
    # Student email validation
    #
    # Example:
    # 2024t02222@stu.cmb.ac.lk
    # --------------------------------------------------

    if not STUDENT_EMAIL_PATTERN.match(email):
        return jsonify({
            "error": "Please use your official university student email"
        }), 400

    # --------------------------------------------------
    # Validate year
    # --------------------------------------------------

    try:
        year_level = int(year_level)
    except (TypeError, ValueError):
        return jsonify({
            "error": "Year must be a number"
        }), 400

    if year_level not in [1, 2, 3, 4]:
        return jsonify({
            "error": "Year must be between 1 and 4"
        }), 400

    # --------------------------------------------------
    # Validate department
    # --------------------------------------------------

    department = Department.query.filter_by(
        code=department_code
    ).first()

    if not department:
        return jsonify({
            "error": "Invalid department"
        }), 400

    # --------------------------------------------------
    # Check duplicate email
    # --------------------------------------------------

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "error": "An account with this email already exists"
        }), 409

    # --------------------------------------------------
    # Find student role
    # --------------------------------------------------

    student_role = Role.query.filter_by(
        name="STUDENT"
    ).first()

    if not student_role:
        return jsonify({
            "error": "Student role is not configured"
        }), 500

    # --------------------------------------------------
    # Find batch
    # --------------------------------------------------

    batch = Batch.query.filter_by(
        department_id=department.id,
        year_level=year_level
    ).first()

    if not batch:
        return jsonify({
            "error": "No batch exists for this department and year"
        }), 400

    # --------------------------------------------------
    # Create user
    # --------------------------------------------------

    user = User(
        name=name.strip(),
        email=email,
        role_id=student_role.id,
        department_id=department.id,
        batch_id=batch.id
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Account created successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role.name,
            "department": user.department.code,
            "year": user.batch.year_level
        }
    }), 201


@auth_bp.post("/login")
def login():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    email = email.strip().lower()

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    if not user.check_password(password):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "access_token": access_token
    }), 200


@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role.name,
            "department": (
                user.department.code
                if user.department
                else None
            ),
            "year": (
                user.batch.year_level
                if user.batch
                else None
            )
        }
    }), 200