import { canvas, context, csrfToken } from './config.js';
import { drawGrid } from './game.js';

let high_score = 0;
let gameOverInterval;  // Variable to store the interval ID

function updateHighScore(score) {
    fetch('/accounts/update-high-score/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken
        },
        body: `score=${score}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            high_score = score;
            document.getElementById("highScoreValue").textContent = high_score;
        }
    });
}

function gameOverAnimation(score) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    context.fillStyle = "rgba(255, 0, 0, 1)"; // Full opacity
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    context.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 60);

    document.getElementById("restartBtn").style.display = "block";
}



export { updateHighScore, gameOverAnimation, gameOverInterval };
