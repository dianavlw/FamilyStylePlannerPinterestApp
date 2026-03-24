from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializers
from .models import FamilyMemberProfile


def test_api(request):
    return JsonResponse({
        "message": "Backend is working "
    })

@api_views(["POST"])
def signup(request):
    serializer = SignupSerializers(data=request.data)
    if serializer.is_valid():
       user = serializer.save()
       return Response(
           {
               "message": "User created successfully",
               "username": user.username,
           },
           status=status.HTTP_201_CREATED,
       )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def family_members(request):
    members = FamilyMemberProfile.objects.select_related("user", "family").all()
    data = [
        {
            "id": member.id,
            "username": member.user.username,
            "email":member.user.email,
            "family":member.family.name,
            "role":member.family.role,
            "style_preference":member.style_preference,
            "clothing_size":member.clothing_size,
            "favorite_color":member.favorite_color,

        }
        for member in members
    ]
    return Response(data)