from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser 
from crispy_forms.helper import FormHelper

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ("age",)

 

