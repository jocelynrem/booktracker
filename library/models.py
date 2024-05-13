from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200, blank=True)
    author = models.CharField(max_length=200, blank=True)
    isbn = models.CharField(max_length=13, unique=True)
    added_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
