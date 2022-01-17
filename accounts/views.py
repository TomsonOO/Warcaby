from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView
from .forms import CustomUserCreationForm
from .models import CustomUser

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

class SettingsView(UpdateView):
    model = CustomUser
    fields = ['age']
    template_name = 'settings.html'
    success_url = reverse_lazy('settings')
    