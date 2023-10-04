const canvas = document.getElementById("gameCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const context = canvas.getContext("2d");
const boxSize = canvas.width / 40;
const moveDistance = boxSize;
const canvasSize = 40;

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Assuming these paths are available in the global scope (defined in the main HTML file)
const snakeHeadSVGPath = window.snakeHeadSVGPath;
const snakeBodySVGPath = window.snakeBodySVGPath;
const snakeTailSVGPath = window.snakeTailSVGPath;
const FoodSVGPath = window.FoodSVGPath;
const mineSVGPath = window.mineSVGPath;

export {
    canvas, context, boxSize, moveDistance, canvasSize, csrfToken,
    snakeHeadSVGPath, snakeBodySVGPath, snakeTailSVGPath, FoodSVGPath, mineSVGPath
};
