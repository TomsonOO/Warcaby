import { canvas, boxSize } from './config.js';

let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
};

let foodImage = new Image();

function getRandomColor() {
    const colors = ['yellow', 'blue', 'purple', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function loadFoodImage(FoodSVGPath) {
    fetch(FoodSVGPath)
        .then(response => response.text())
        .then(data => {
            const randomColor = getRandomColor();
            const coloredSVG = data.replace('COLOR_PLACEHOLDER', randomColor);
            const blob = new Blob([coloredSVG], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            foodImage.src = url;
        });
}

export { food, foodImage, getRandomColor, loadFoodImage };
