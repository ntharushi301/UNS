from flask import Flask

from config import Config
from app.extensions import (
    bcrypt,
    cors,
    db,
    jwt,
    migrate,
)


def create_app():
    app = Flask(__name__)

    # --------------------------------------------------
    # Configuration
    # --------------------------------------------------

    app.config.from_object(Config)

    # --------------------------------------------------
    # Initialize extensions
    # --------------------------------------------------

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    # --------------------------------------------------
    # Import models
    #
    # This ensures SQLAlchemy knows about all models
    # when migrations are generated.
    # --------------------------------------------------

    from app import models

    # --------------------------------------------------
    # Register API routes
    # --------------------------------------------------

    from app.routes import (
        auth_bp,
        notices_bp,
        users_bp,
        departments_bp,
        batches_bp,
        academic_years_bp,
        representations_bp,
        student_history_bp,
        admin_bp
    )
    app.register_blueprint(auth_bp)
    app.register_blueprint(notices_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(departments_bp)
    app.register_blueprint(batches_bp)
    app.register_blueprint(academic_years_bp)
    app.register_blueprint(representations_bp)
    app.register_blueprint(student_history_bp)
    app.register_blueprint(admin_bp)
    # --------------------------------------------------
    # Health check
    # --------------------------------------------------

    @app.get("/api/health")
    def health_check():
        return {
            "status": "ok",
            "message": "University Notice System API is running"
        }

    return app