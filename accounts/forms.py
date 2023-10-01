from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.exceptions import ValidationError
from .models import CustomUser
from crispy_forms.helper import FormHelper


def validate_username_length(value):
    if len(value) < 4:
        raise ValidationError("Username should be at least 4 characters long.")


class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(
        max_length=150,
        required=True,
        validators=[validate_username_length],
        widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'custom-width'}),
        help_text='',
        label='',
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'custom-width'}),
        help_text='',
        label='',
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password', 'class': 'custom-width'}),
        help_text='',
        label='',
    )

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = UserCreationForm.Meta.fields


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        max_length=150,
        required=True,
        validators=[validate_username_length],
        widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'custom-width'}),
        label='',
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'custom-width'}),
        label='',
    )
