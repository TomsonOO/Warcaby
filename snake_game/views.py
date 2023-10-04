from django.shortcuts import render
from django.templatetags.static import static
from accounts.models import CustomUser


def game_view(request):
    user_with_high_score = CustomUser.objects.order_by('-high_score').first()
    # Query the top 10 users based on high_score for the leaderboard
    top_users = CustomUser.objects.order_by('-high_score')[:10]

    context = {
        'snake_head_svg': static('snake_game/images/snake_head.svg'),
        'snake_body_svg': static('snake_game/images/snake_body.svg'),
        'snake_tail_svg': static('snake_game/images/snake_tail.svg'),
        'food_svg': static('snake_game/images/food.svg'),
        'mine_svg': static('snake_game/images/mine.svg'),
        'high_score': user_with_high_score.high_score if user_with_high_score else 0,
        'top_users': top_users  # Add the leaderboard data to the context
    }

    return render(request, 'snake_game/game.html', context)
