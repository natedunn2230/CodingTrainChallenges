let food;
let snake;

let score = 0;
let VELOCITY = 20;

function setup() {
    createCanvas(800, 800);
    frameRate(10);
    food = new Food();
    snake = new Snake(-VELOCITY);
}

function draw() {
    background(0);

    if(outOfBounds()) {
        restartGame();
    }

    if(snake.eatFood(food)) {
        snake.grow();
        food.respawn();
        score++;
    }
    //update objects
    snake.update();

    // render objects
    food.show();
    snake.show();

    fill(255);
    textSize(24);

    text(`Score: ${score}`, 25, 25);
}

// Handle user input
function keyTyped() {
    if(key === 'w') {
        snake.addMovement(0, -VELOCITY);
    }
    if(key === 's') {
        snake.addMovement(0, VELOCITY);
    }
    if(key === 'a') {
        snake.addMovement(-VELOCITY, 0);
    }
    if(key === 'd') {
        snake.addMovement(VELOCITY, 0);
    }
}

// checks if player is out of play area
function outOfBounds() {
    return (snake.head.x  < 0 || snake.head.x + snake.size > width || snake.head.y < 0 || snake.head.y + snake.size > height);
}

function restartGame() {
    snake = new Snake(-VELOCITY);
    food.respawn();
    score = 0;
}