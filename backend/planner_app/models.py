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
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    about_me = models.TextField(blank=True)

    instagram_url = models.URLField(blank=True)
    pinterest_url = models.URLField(blank=True)
    tiktok_url = models.URLField(blank=True)
    other_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.user.username
    
class Board(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='boards')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
    