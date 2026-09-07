import os

from dotenv import load_dotenv


load_dotenv()


class Config:
    # --------------------------------------------------
    # Flask
    # --------------------------------------------------

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "dev-secret-change-this"
    )

    # --------------------------------------------------
    # Database
    # --------------------------------------------------

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///university_notice.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # --------------------------------------------------
    # JWT
    # --------------------------------------------------

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "dev-jwt-secret-change-this"
    )

    # --------------------------------------------------
    # Email domains
    # --------------------------------------------------

    STUDENT_EMAIL_DOMAIN = os.getenv(
        "STUDENT_EMAIL_DOMAIN",
        "stu.cmb.ac.lk"
    )

    STAFF_EMAIL_DOMAIN = os.getenv(
        "STAFF_EMAIL_DOMAIN",
        "cmb.ac.lk"
    )