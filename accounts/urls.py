from django.urls import path
from .views import ChangeTheme, SignUpView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),    
    path("<int:pk>/", ChangeTheme.as_view(), name='settings'),    
]