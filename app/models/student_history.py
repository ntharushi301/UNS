from app.extensions import db


class StudentAcademicHistory(db.Model):
    __tablename__ = "student_academic_history"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    batch_id = db.Column(
        db.Integer,
        db.ForeignKey("batches.id"),
        nullable=False
    )

    academic_year_id = db.Column(
        db.Integer,
        db.ForeignKey("academic_years.id"),
        nullable=False
    )

    year_level = db.Column(
        db.Integer,
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="academic_history"
    )

    batch = db.relationship(
        "Batch"
    )

    academic_year = db.relationship(
        "AcademicYear"
    )

    def __repr__(self):
        return (
            f"<StudentAcademicHistory "
            f"user={self.user_id} "
            f"year={self.year_level}>"
        )