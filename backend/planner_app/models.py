from django.db import models
from django.contrib.auth.models import User

class Family(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class FamilyMemberProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name="members")
    role = models.CharField(max_length=50)
    style_preferences = models.CharField(max_length=255, blank=True)
    clothing_size = models.CharField(max_length=50, blank=True)
    favorite_color = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"