from django.urls import path
from .views import test_api, signup, family_members, ProfileView

urlpatterns = [
    path("api/test/", test_api, name="test_api"),
    path("api/signup/", signup, name="signup"),
    path("api/family-members/", family_members, name="family_members"),
    path("api/profile/", ProfileView.as_view(), name="profile"),
]