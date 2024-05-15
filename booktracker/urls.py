from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as authtoken_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("library.urls")),
]
