from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Family, FamilyMemberProfile

class SignupSerializers(serializers.Serializer):
    username = serializers.CharField(max_lenght=150)
    email = serializers.EmailField()
    password = serializers.Charfield(write_only=True)
    family_name = serializers.Charfield(max_lenght = 100)
    role = serializers.Charfield(max_lenght=50)
    style_preference = serializers.Charfield(max_lenght=255, required=False, allow_blank=True)
    clothing_size = serializers.Charfield(max_lenght=50, required=False, allow_blank=True)
    favorite_color = serializers.Charfield(max_lenght=50, required=False, allow_blank=True)
    