from app.extensions import db


class AcademicYear(db.Model):
    __tablename__ = "academic_years"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    year = db.Column(
        db.Integer,
        unique=True,
        nullable=False
    )

    name = db.Column(
        db.String(50),
        nullable=False
    )

    batches = db.relationship(
        "Batch",
        back_populates="academic_year",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<AcademicYear {self.name}>"