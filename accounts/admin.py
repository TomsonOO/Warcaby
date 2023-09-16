from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    model = CustomUser
    list_display = [
        "username",
        "is_staff",
        "dark_theme"
    ]
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("dark_theme",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("dark_theme",)}),)


admin.site.register(CustomUser, CustomUserAdmin)