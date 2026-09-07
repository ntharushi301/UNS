from app.extensions import db


class Batch(db.Model):
    __tablename__ = "batches"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    year_level = db.Column(
        db.Integer,
        nullable=False
    )

    department_id = db.Column(
        db.Integer,
        db.ForeignKey("departments.id"),
        nullable=False
    )

    academic_year_id = db.Column(
        db.Integer,
        db.ForeignKey("academic_years.id"),
        nullable=False
    )

    department = db.relationship(
        "Department",
        back_populates="batches"
    )

    academic_year = db.relationship(
        "AcademicYear",
        back_populates="batches"
    )

    users = db.relationship(
        "User",
        back_populates="batch"
    )

    def __repr__(self):
        return f"<Batch {self.name}>"