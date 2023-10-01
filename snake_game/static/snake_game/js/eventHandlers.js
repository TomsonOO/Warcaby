import { canvas, context, boxSize } from './config.js';
import { draw, getScore, setIsGameOver, getIsGameOver } from './game.js';
import { snake } from './snake.js';
import { obstacles } from './obstacle.js';
import { gameOverAnimation, gameOverInterval } from './ui.js';

let d = "RIGHT";
let game;
let isGameRunning = false;
let speed = 60;
let gameOver = false;

const startPauseBtn = document.getElementById("startPauseBtn");
const restartBtn = document.getElementById("restartBtn");

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function toggleGame() {
    if (isGameRunning) {
        clearInterval(game);
        this.textContent = "Resume Game";
    } else {
        game = setInterval(draw, 100);
        this.textContent = "Pause Game";
    }
    isGameRunning = !isGameRunning;
}

function restartGame() {
    // Clear any existing game loop
    clearInterval(game);

    // Reset game state
    gameOver = false;

    // Reset snake to its initial state
    snake.length = 0;
    snake.push({ x: canvas.width / 2, y: canvas.height / 2 });
    snake.push({ x: canvas.width / 2 - boxSize, y: canvas.height / 2 });
    snake.push({ x: canvas.width / 2 - 2 * boxSize, y: canvas.height / 2 });

    // Clear obstacles
    obstacles.length = 0;

    if (gameOverInterval) {
        clearInterval(gameOverInterval); // Clear the game over animation interval
    }

    d = "RIGHT";
    speed = 60;

    document.getElementById("restartBtn").style.display = "none";
    game = setInterval(draw, speed);
}

document.addEventListener("keydown", direction);
startPauseBtn.addEventListener("click", toggleGame);
restartBtn.addEventListener("click", restartGame);

export { speed, d, direction, restartGame };
