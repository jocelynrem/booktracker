# library/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, register, login

router = DefaultRouter()
router.register(r"books", BookViewSet, basename="book")

urlpatterns = [
    path("", include(router.urls)),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
]
