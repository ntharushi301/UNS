from app.extensions import db
from app.models import User, Role, Department


def create_test_representative():
    role = Role.query.filter_by(
        name="REPRESENTATIVE"
    ).first()

    department = Department.query.filter_by(
        code="ICT"
    ).first()

    if not role:
        raise Exception("REPRESENTATIVE role not found")

    if not department:
        raise Exception("ICT department not found")

    email = "representative@ict.cmb.ac.lk"

    user = User.query.filter_by(
        email=email
    ).first()

    if user:
        print("Test representative already exists.")
        return

    user = User(
        name="Test Representative",
        email=email,
        role_id=role.id,
        department_id=department.id
    )

    user.set_password("password123")

    db.session.add(user)
    db.session.commit()

    print("Test representative created successfully.")


if __name__ == "__main__":
    from app import create_app

    app = create_app()

    with app.app_context():
        create_test_representative()