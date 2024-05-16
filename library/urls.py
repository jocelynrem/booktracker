from django.urls import path
from .views import register, login, BookViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"books", BookViewSet, basename="book")

urlpatterns = router.urls

urlpatterns += [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
]
