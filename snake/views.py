from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class SnakeView(TemplateView):
    template_name = 'snake.html'
