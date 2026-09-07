from app.extensions import db
from app.models import AcademicYear, Batch, Department, Role


DEPARTMENTS = {
    "ICT": "Information and Communication Technology",
    "IAT": "Information and Application Technology",
    "AT": "Agricultural Technology",
    "ET": "Environmental Technology",
}


ROLES = [
    "ADMIN",
    "DEAN",
    "LECTURER",
    "INSTRUCTOR",
    "REPRESENTATIVE",
    "STUDENT",
    "AR",
    "MARSHAL",
    "OTHER_STAFF",
]


def seed_organization():
    # --------------------------------------------------
    # Roles
    # --------------------------------------------------

    for role_name in ROLES:
        role = Role.query.filter_by(
            name=role_name
        ).first()

        if not role:
            db.session.add(
                Role(name=role_name)
            )

    db.session.flush()

    # --------------------------------------------------
    # Departments
    # --------------------------------------------------

    departments = {}

    for code, name in DEPARTMENTS.items():
        department = Department.query.filter_by(
            code=code
        ).first()

        if not department:
            department = Department(
                code=code,
                name=name
            )

            db.session.add(department)

        departments[code] = department

    db.session.flush()

    # --------------------------------------------------
    # Current academic year
    # --------------------------------------------------

    academic_year = AcademicYear.query.filter_by(
        year=2026
    ).first()

    if not academic_year:
        academic_year = AcademicYear(
            year=2026,
            name="2026/2027"
        )

        db.session.add(academic_year)

    db.session.flush()

    # --------------------------------------------------
    # Create 4 years for each department
    # --------------------------------------------------

    for department in departments.values():

        for year_level in range(1, 5):

            batch_name = (
                f"{department.code} "
                f"Year {year_level}"
            )

            batch = Batch.query.filter_by(
                name=batch_name
            ).first()

            if not batch:
                batch = Batch(
                    name=batch_name,
                    year_level=year_level,
                    department_id=department.id,
                    academic_year_id=academic_year.id
                )

                db.session.add(batch)

    db.session.commit()

    print("Organization seed completed successfully.")