from app.extensions import db


class Representation(db.Model):
    __tablename__ = "representations"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    department_id = db.Column(
        db.Integer,
        db.ForeignKey("departments.id"),
        nullable=True
    )

    year_level = db.Column(
        db.Integer,
        nullable=True
    )

    representation_type = db.Column(
        db.String(30),
        nullable=False
    )

    gender = db.Column(
        db.String(20),
        nullable=True
    )

    user = db.relationship(
        "User",
        back_populates="representations"
    )

    department = db.relationship(
        "Department"
    )

    def __repr__(self):
        return (
            f"<Representation "
            f"user={self.user_id} "
            f"type={self.representation_type}>"
        )