from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = "django-insecure-placeholder"
DEBUG = True
INSTALLED_APPS = [
    "django.contrib.admin", "django.contrib.auth", "django.contrib.contenttypes",
    "rest_framework", "corsheaders", "rooms", "reservations", "users", "payments",
]
AUTH_USER_MODEL = "users.User"
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["rest_framework_simplejwt.authentication.JWTAuthentication"],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
}
DATABASES = {"default": {"ENGINE": "django.db.backends.postgresql", "NAME": "hotel_db"}}
CELERY_BROKER_URL = "redis://localhost:6379/0"
