from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username


class Book(models.Model):
    title = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    isbn = models.CharField(max_length=13)
    added_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title if self.title else "Untitled"
