from django.urls import path
from .views import HomePageView, SnakeView

urlpatterns = [
    path('snake', SnakeView.as_view(), name='snake'),
    path('', HomePageView.as_view(), name='home'),
]