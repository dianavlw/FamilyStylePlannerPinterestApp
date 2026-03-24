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

    def create(self, validated_data):
        family_name = validated_data.pop("family_name")
        role =validated_data.pop("role")
        style_preferences = validated_data.pop("style_preferences", "")
        clothing_size = validated_data.pop("clothing_size", "")
        favorite_color = validated_data.pop("favorite_color", "")

        user = User.objects.create_user(
            username=validated_data["username"]
            email=validated_data["email"]
            password=validated_data["password"],
            
        )

        family, _ = Family.objects.get_or_create(name=family_name)

        FamilyMemberProfile.objects.create(
            user =user,
            family =family, 
            role= role, 
            style_preferences= style_preferences,
            clothing_size=clothing_size,
            favorite_color=favorite_color,
        )

        return user