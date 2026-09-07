from datetime import datetime, timezone

from app.extensions import db


class Notice(db.Model):
    __tablename__ = "notices"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(255),
        nullable=False
    )

    content = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    author_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    author = db.relationship(
        "User",
        back_populates="notices"
    )

    audiences = db.relationship(
        "NoticeAudience",
        back_populates="notice",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Notice {self.id}: {self.title}>"