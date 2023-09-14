from django.urls import path
from .views import LogInRequired, SnakeView

urlpatterns = [
    path('snake123/', SnakeView.as_view(), name='snake'),
    path('LogInRequired/', LogInRequired.as_view(), name='logIn_required'),
]