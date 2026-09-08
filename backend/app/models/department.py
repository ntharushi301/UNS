from app.extensions import db


class Department(db.Model):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)

    code = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    users = db.relationship(
        "User",
        back_populates="department"
    )

    batches = db.relationship(
        "Batch",
        back_populates="department",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Department {self.code}>"