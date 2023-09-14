from django.shortcuts import render
from django.templatetags.static import static

def game_view(request):
    context = {
        'snake_head_svg': static('snake_game/images/snake_head.svg'),
        'snake_body_svg': static('snake_game/images/snake_body.svg'),
        'snake_tail_svg': static('snake_game/images/snake_tail.svg'),
        'apple_svg': static('snake_game/images/apple.svg'),
    }

    return render(request, 'snake_game/game.html', context)