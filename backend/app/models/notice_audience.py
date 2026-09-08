from app.extensions import db


class NoticeAudience(db.Model):
    __tablename__ = "notice_audiences"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    notice_id = db.Column(
        db.Integer,
        db.ForeignKey("notices.id"),
        nullable=False
    )

    audience_type = db.Column(
        db.String(30),
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

    notice = db.relationship(
        "Notice",
        back_populates="audiences"
    )

    department = db.relationship(
        "Department"
    )

    def __repr__(self):
        return (
            f"<NoticeAudience "
            f"notice={self.notice_id} "
            f"type={self.audience_type}>"
        )