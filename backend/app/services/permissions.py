from app.models import User


# ============================================================
# ROLE HIERARCHY
# ============================================================
#
# Higher number = higher academic authority.
#
# ADMIN is handled separately because ADMIN has system-wide
# authority.
#
# DEAN
#   ↓
# LECTURER / MARSHAL
#   ↓
# INSTRUCTOR
#   ↓
# REPRESENTATIVE
#   ↓
# STUDENT
#
# AR and OTHER_STAFF are outside this hierarchy.
# ============================================================

ACADEMIC_LEVELS = {
    "DEAN": 5,
    "LECTURER": 4,
    "MARSHAL": 4,
    "INSTRUCTOR": 3,
    "REPRESENTATIVE": 2,
    "STUDENT": 1,
}


def get_role_name(user):
    """
    Return the user's role name.
    """

    if not user or not user.role:
        return None

    return user.role.name


def is_admin(user):
    """
    Check whether the user is an administrator.
    """

    return get_role_name(user) == "ADMIN"


def is_dean(user):
    """
    Check whether the user is a dean.
    """

    return get_role_name(user) == "DEAN"


def is_lecturer(user):
    """
    Check whether the user is a lecturer.
    """

    return get_role_name(user) == "LECTURER"


def is_instructor(user):
    """
    Check whether the user is an instructor.
    """

    return get_role_name(user) == "INSTRUCTOR"


def is_marshal(user):
    """
    Marshal has lecturer-level authority.
    """

    return get_role_name(user) == "MARSHAL"


def is_representative(user):
    """
    Check whether the user is a representative.
    """

    return get_role_name(user) == "REPRESENTATIVE"


def is_academic_staff(user):
    """
    Check whether the user belongs to the academic hierarchy.
    """

    return get_role_name(user) in {
        "DEAN",
        "LECTURER",
        "INSTRUCTOR",
        "REPRESENTATIVE",
    }


def get_academic_level(user):
    """
    Return the user's authority level.

    Returns None for roles outside the academic hierarchy.
    """

    role = get_role_name(user)

    return ACADEMIC_LEVELS.get(role)


# ============================================================
# NOTICE CREATION
# ============================================================

def can_create_notice(user):
    """
    Determine whether a user can create a notice.

    Currently:
        ADMIN
        DEAN
        LECTURER
        INSTRUCTOR
        MARSHAL
        REPRESENTATIVE

    can create notices.

    Students cannot create notices.
    """

    if not user:
        return False

    return get_role_name(user) in {
        "ADMIN",
        "DEAN",
        "LECTURER",
        "INSTRUCTOR",
        "MARSHAL",
        "REPRESENTATIVE",
    }


# ============================================================
# NOTICE EDITING
# ============================================================

def can_edit_notice(user, notice):
    """
    Determine whether a user can edit a notice.
    """

    if not user or not notice:
        return False

    role = get_role_name(user)

    # --------------------------------------------------------
    # ADMIN
    # --------------------------------------------------------

    if role == "ADMIN":
        return True

    # --------------------------------------------------------
    # Author can edit their own notice
    # --------------------------------------------------------

    if notice.author_id == user.id:
        return True

    # --------------------------------------------------------
    # DEAN
    #
    # Dean can edit notices created by people below the dean
    # in the academic hierarchy.
    # --------------------------------------------------------

    if role == "DEAN":
        author_role = get_role_name(notice.author)

        author_level = ACADEMIC_LEVELS.get(
            author_role
        )

        dean_level = ACADEMIC_LEVELS["DEAN"]

        return (
            author_level is not None
            and author_level < dean_level
        )

    # --------------------------------------------------------
    # Lecturer / Marshal
    #
    # They can edit notices from lower academic levels.
    # --------------------------------------------------------

    if role in {"LECTURER", "MARSHAL"}:

        author_role = get_role_name(notice.author)

        author_level = ACADEMIC_LEVELS.get(
            author_role
        )

        user_level = ACADEMIC_LEVELS[role]

        return (
            author_level is not None
            and author_level < user_level
        )

    # --------------------------------------------------------
    # Instructor
    #
    # Can edit notices created by representatives.
    # --------------------------------------------------------

    if role == "INSTRUCTOR":

        author_role = get_role_name(notice.author)

        author_level = ACADEMIC_LEVELS.get(
            author_role
        )

        user_level = ACADEMIC_LEVELS["INSTRUCTOR"]

        return (
            author_level is not None
            and author_level < user_level
        )

    return False


# ============================================================
# NOTICE DELETION
# ============================================================

def can_delete_notice(user, notice):
    """
    Determine whether a user can delete a notice.

    The same hierarchy used for editing is applied here.
    """

    return can_edit_notice(
        user,
        notice
    )


# ============================================================
# NOTICE VISIBILITY
# ============================================================

def can_view_notice(user, notice):
    """
    Determine whether a user belongs to at least one audience
    of the notice.
    """

    if not user or not notice:
        return False

    # --------------------------------------------------------
    # ADMIN can see everything
    # --------------------------------------------------------

    if is_admin(user):
        return True

    # --------------------------------------------------------
    # Check each audience
    # --------------------------------------------------------

    for audience in notice.audiences:

        # ----------------------------------------------
        # ALL
        # ----------------------------------------------

        if audience.audience_type == "ALL":
            return True

        # ----------------------------------------------
        # DEPARTMENT
        # ----------------------------------------------

        if audience.audience_type == "DEPARTMENT":

            if (
                user.department_id
                and audience.department_id
                == user.department_id
            ):
                return True

        # ----------------------------------------------
        # YEAR
        # ----------------------------------------------

        if audience.audience_type == "YEAR":

            if (
                user.department_id
                == audience.department_id
                and user.batch
                and user.batch.year_level
                == audience.year_level
            ):
                return True

    return False