const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;

// Snake
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Food
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let direction;

// Controls
document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, 400, 400);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00b3ffff" : "#00b3ffff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "#ff0000ff";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake head
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // Game over if hit wall
  if (headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {
    clearInterval(game);
    alert("Game Over!");
    location.reload();
  }

  // Eat food
  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: headX, y: headY };

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);