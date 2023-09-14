from django.db import models

class HighScore(models.Model):
    player_name = models.CharField(max_length=100)
    score = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.player_name} - {self.score}"
