from django.urls import path
from .views import SnakeView

urlpatterns = [
    path('snake/', SnakeView.as_view(), name='snake'),
]