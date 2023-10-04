import { canvas, boxSize, moveDistance } from './config.js';
import { roundToGrid } from './game.js';

let snake = [
    { x: canvas.width / 2, y: canvas.height / 2 },
    { x: canvas.width / 2 - boxSize, y: canvas.height / 2 },
    { x: canvas.width / 2 - 2 * boxSize, y: canvas.height / 2 }
];

let snakeHeadImage = new Image();
snakeHeadImage.src = snakeHeadSVGPath;

let snakeBodyImage = new Image();
snakeBodyImage.src = snakeBodySVGPath;

let snakeTailImage = new Image();
snakeTailImage.src = snakeTailSVGPath;

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


export { snake, snakeHeadImage, snakeBodyImage, snakeTailImage, isCollisionWithObject };
