from django.db import models
from django.urls import reverse

class CustomUser(models.Model):
    age = models.PositiveIntegerField(null=True, blank=True)


    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("signup", args=[str(self.id)])