from django.urls import path
from .views import ChangeTheme, SignUpView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),    
    path('settings/<int:pk>/edit/', ChangeTheme.as_view(), name='settings'),    
]