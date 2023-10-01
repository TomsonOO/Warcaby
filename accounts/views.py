from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, View
from accounts.models import CustomUser
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


class LoginView(View):
    template_name = 'registration/login.html'
    def get(self, request):
        form = CustomAuthenticationForm()
        return render(request, 'registration/login.html', {'form': form})

    def post(self, request):
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
        return render(request, 'registration/login.html', {'form': form})


class ChangeTheme(UpdateView):
    model = CustomUser
    template_name = "settings.html"
    fields = ["dark_theme"]


def getHighScore(request):
    if request.user.is_authenticated:
        # Fetch the high score for the logged-in user
        return JsonResponse({'high_score': request.user.high_score})
    else:
        return JsonResponse({'error': 'User not authenticated'}, status=401)


@csrf_exempt
def updateHighScore(request):
    if request.method == 'POST' and request.user.is_authenticated:
        new_score = int(request.POST.get('score', 0))
        if new_score > request.user.high_score:
            request.user.high_score = new_score
            request.user.save()
            return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'})
