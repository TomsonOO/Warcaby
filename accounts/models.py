from django.db import models
from django.urls import reverse

class CustomUser(models.Model):
    age = models.PositiveIntegerField(null=True, blank=True)
    dark_theme = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    def get_absolute_url(self): 
        return reverse("settings", args=[str(self.id)])
