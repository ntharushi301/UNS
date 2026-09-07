from app.extensions import db
from app.models import User, Role


def create_test_admin():

    role = Role.query.filter_by(
        name="ADMIN"
    ).first()

    if not role:
        raise Exception("ADMIN role not found")

    email = "admin@uns.cmb.ac.lk"

    user = User.query.filter_by(
        email=email
    ).first()

    if user:
        print("Test admin already exists.")
        return

    user = User(
        name="Test Administrator",
        email=email,
        role_id=role.id
    )

    user.set_password("password123")

    db.session.add(user)
    db.session.commit()

    print("Test admin created successfully.")


if __name__ == "__main__":
    from app import create_app

    app = create_app()

    with app.app_context():
        create_test_admin()