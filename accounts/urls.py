from django.urls import path
from .views import ChangeTheme, SignUpView, getHighScore, updateHighScore

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),    
    path("<int:pk>/", ChangeTheme.as_view(), name='settings'),
    path('get-high-score/', getHighScore, name='get-high-score'),
    path('update-high-score/', updateHighScore, name='update-high-score'),
]