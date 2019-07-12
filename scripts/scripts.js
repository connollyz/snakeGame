const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const donut = new Image();
donut.src = "assets/gfx/donut.png";

const ground = new Image();
ground.src = "assets/gfx/ground.png";

//load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = 'assets/audio/dead.mp3';
eat.src ='assets/audio/eat.mp3';
up.src = 'assets/audio/up.mp3';
left.src = 'assets/audio/left.mp3';
right.src = 'assets/audio/right.mp3';
down.src = 'assets/audio/down.mp3';


// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
        left.play();
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play()
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {

    ctx.drawImage(ground, 0, 0, 608, 608);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "hotpink" : "pink";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "hotpink";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(donut, food.x, food.y, box, 25);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over

    if (snakeX < 0 || snakeX > 18 * box || snakeY < 0 * box || snakeY > 18 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
       
    }

    snake.unshift(newHead);

    ctx.fillStyle = "hotpink";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);
