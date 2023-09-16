const canvas = document.getElementById("gameCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const context = canvas.getContext("2d");
const boxSize = canvas.width / 40;
const moveDistance = boxSize;
const canvasSize = 40;

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


let isGameOver = false;
let score = 0;

let snake = [
    { x: canvas.width / 2, y: canvas.height / 2 },
    { x: canvas.width / 2 - boxSize, y: canvas.height / 2 },
    { x: canvas.width / 2 - 2 * boxSize, y: canvas.height / 2 }
];

//add best score mechanism that will load the best score from the database
//and update it if the current score is higher than the best score
//let bestScore = 0;

let high_score = 0;

// Fetch the best score from the server
fetch('/accounts/get-high-score/')
    .then(response => {
        if (response.status === 401) {
            throw new Error('User not authenticated');
        }
        return response.json();
    })
    .then(data => {
        if (data.high_score !== undefined) {
            document.getElementById("highScoreValue").textContent = data.high_score;
        }
    })
    .catch(error => {
        console.error('Error fetching high score:', error);
        // Optionally, hide the high score display or show a message to the user
    });


let d = "RIGHT";
document.addEventListener("keydown", direction);
let obstacleAdded = false;

let game;
let isGameRunning = false;
let speed = 70;

let obstacles = [];

let snakeHeadImage = new Image();
snakeHeadImage.src = snakeHeadSVGPath;

let snakeBodyImage = new Image();
snakeBodyImage.src = snakeBodySVGPath;

let snakeTailImage = new Image();
snakeTailImage.src = snakeTailSVGPath;

let foodImage = new Image();
foodImage.src = snakeFoodSVGPath;

function drawGrid() {
    context.strokeStyle = "#3f6237";
    context.lineWidth = 0.1;
    const cornerRadius = 7; // Adjust this value to change the rounding amount

    for (let x = 0; x <= canvas.width; x += boxSize) {
        for (let y = 0; y <= canvas.height; y += boxSize) {
            context.beginPath();
            context.moveTo(x + cornerRadius, y);
            context.arcTo(x + boxSize, y, x + boxSize, y + boxSize, cornerRadius);
            context.arcTo(x + boxSize, y + boxSize, x, y + boxSize, cornerRadius);
            context.arcTo(x, y + boxSize, x, y, cornerRadius);
            context.arcTo(x, y, x + boxSize, y, cornerRadius);
            context.closePath();
            context.stroke();
        }
    }
}

function roundToGrid(value) {
    return Math.round(value / boxSize) * boxSize;
}

function generateObstacle() {
    return {
        x: Math.floor(Math.random() * canvasSize) * boxSize,
        y: Math.floor(Math.random() * canvasSize) * boxSize
    };
}

document.getElementById("startPauseBtn").addEventListener("click", function() {
    if (isGameRunning) {
        clearInterval(game);
        this.textContent = "Resume Game";
    } else {
        game = setInterval(draw, speed);
        this.textContent = "Pause Game";
    }
    isGameRunning = !isGameRunning;
});

window.addEventListener('resize', function() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Redraw the "Game Over" text if the game is over
    if (isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        context.fillStyle = "rgba(255, 0, 0, 1)"; // Full opacity
        context.font = "50px Arial";
        context.textAlign = "center";
        context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        context.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 60);
    }
});


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

let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
};

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            context.drawImage(snakeHeadImage, snake[i].x, snake[i].y, boxSize, boxSize);
        } else if (i == snake.length - 1) {
            context.drawImage(snakeTailImage, snake[i].x, snake[i].y, boxSize, boxSize);
        } else {
            context.drawImage(snakeBodyImage, snake[i].x, snake[i].y, boxSize, boxSize);
        }
    }

    context.drawImage(foodImage, food.x, food.y, boxSize, boxSize);

    for (let obstacle of obstacles) {
        context.fillStyle = "#343a40";
        context.fillRect(obstacle.x, obstacle.y, boxSize, boxSize);
    }

    if (score % 3 == 0 && score != 0 && !obstacleAdded) {
        obstacles.push(generateObstacle());
        obstacleAdded = true;
    } else if (score % 3 != 0) {
        obstacleAdded = false;
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= moveDistance;
    if (d == "UP") snakeY -= moveDistance;
    if (d == "RIGHT") snakeX += moveDistance;
    if (d == "DOWN") snakeY += moveDistance;

    if (roundToGrid(snakeX) == food.x && roundToGrid(snakeY) == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };

        let changeSpeedBy = Math.floor(Math.random() * 5);
        if (Math.random() < 0.5) {
            speed = Math.min(60, speed + changeSpeedBy);
        } else {
            speed = Math.max(70, speed - changeSpeedBy);
        }


        clearInterval(game);
        game = setInterval(draw, speed);
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);

    let roundedSnakeX = roundToGrid(snakeX);
    let roundedSnakeY = roundToGrid(snakeY);

    if (roundedSnakeX < 0 || roundedSnakeY < 0 || roundedSnakeX >= canvas.width || roundedSnakeY >= canvas.height) {
        clearInterval(game);
        gameOverAnimation();
        return;
    }

    if (isCollisionWithObject(newHead, snake.slice(1))) {
        clearInterval(game);
        gameOverAnimation();
        return;
    }

    if (isCollisionWithObject(newHead, obstacles)) {
        clearInterval(game);
        gameOverAnimation();
        return;
    }

    document.getElementById("scoreValue").textContent = score;
}

function isCollisionWithObject(head, array) {
    const roundedX = roundToGrid(head.x);
    const roundedY = roundToGrid(head.y);

    for (let i = 0; i < array.length; i++) {
        if (roundedX == array[i].x && roundedY == array[i].y) {
            return true;
        }
    }
    return false;
}

document.getElementById("difficulty").addEventListener("change", function() {
    speed = parseInt(this.value);
    clearInterval(game);
    if (isGameRunning) {
        game = setInterval(draw, speed);
    }
});

function gameOverAnimation() {
    if (score > high_score) {
        // Update the high score in the database
        fetch('/accounts/update-high-score/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken  // Ensure you pass the CSRF token for Django
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
    isGameOver = true;
    let opacity = 0.0;
    const interval = setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        context.fillStyle = `rgba(255, 0, 0, ${opacity})`;
        context.font = "50px Arial";
        context.textAlign = "center";
        context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        context.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 60);

        opacity += 0.05;
        if (opacity >= 1) clearInterval(interval);
    }, 50);

    document.getElementById("restartBtn").style.display = "block";
}

document.getElementById("restartBtn").addEventListener("click", function() {
    isGameOver = false;
    snake = [
        { x: canvas.width / 2, y: canvas.height / 2 },
        { x: canvas.width / 2 - boxSize, y: canvas.height / 2 },
        { x: canvas.width / 2 - 2 * boxSize, y: canvas.height / 2 }
    ];
    d = "RIGHT";
    score = 0;
    speed = 70;
    obstacles = [];
    obstacleAdded = false;
    food = {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
    };

    this.style.display = "none";
    game = setInterval(draw, speed);
});
