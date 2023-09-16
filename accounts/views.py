from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView
from accounts.models import CustomUser
from .forms import CustomUserCreationForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


class ChangeTheme(UpdateView):
    model = CustomUser
    template_name = "settings.html"
    fields = ["age", "dark_theme"]



def getHighScore(request):
    if request.user.is_authenticated:
        # Fetch the high score for the logged-in user
        high_score = ...  # Fetch the high score from the database
        return JsonResponse({'high_score': high_score})
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
