from app.extensions import bcrypt, db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(150),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False,
        index=True
    )

    registration_number = db.Column(
        db.String(50),
        unique=True,
        nullable=True,
        index=True
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role_id = db.Column(
        db.Integer,
        db.ForeignKey("roles.id"),
        nullable=False
    )

    department_id = db.Column(
        db.Integer,
        db.ForeignKey("departments.id"),
        nullable=True
    )

    batch_id = db.Column(
        db.Integer,
        db.ForeignKey("batches.id"),
        nullable=True
    )

    role = db.relationship(
        "Role",
        back_populates="users"
    )

    department = db.relationship(
        "Department",
        back_populates="users"
    )

    batch = db.relationship(
        "Batch",
        back_populates="users"
    )

    representations = db.relationship(
        "Representation",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    academic_history = db.relationship(
        "StudentAcademicHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    notices = db.relationship(
        "Notice",
        back_populates="author"
    )

    def set_password(self, password):
        self.password_hash = (
            bcrypt.generate_password_hash(password)
            .decode("utf-8")
        )

    def check_password(self, password):
        return bcrypt.check_password_hash(
            self.password_hash,
            password
        )

    def __repr__(self):
        return f"<User {self.email}>"