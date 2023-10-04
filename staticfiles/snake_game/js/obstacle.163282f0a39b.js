import { canvasSize, boxSize } from './config.js';

let obstacles = [];

let mineImage = new Image();
mineImage.src = mineSVGPath;

function generateObstacle() {
    return {
        x: Math.floor(Math.random() * canvasSize) * boxSize,
        y: Math.floor(Math.random() * canvasSize) * boxSize,
        type: 'mine'
    };
}

export { mineImage, obstacles, generateObstacle };
