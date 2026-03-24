from django.contrib import admin
from django.urls import path
from planner_app.views import test_api, signup, family_members

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', test_api),
    path("api/signup/", signup),
    path("api/family-members/", family_members),
]