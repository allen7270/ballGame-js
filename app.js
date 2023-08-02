const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let brickArray = [];

function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall(ball_x, ball_y) {
    return (
      ball_x >= this.x - radius &&
      ball_x <= this.x + this.width + radius &&
      ball_y <= this.y + this.height + radius &&
      ball_y >= this.y - radius
    );
  }
}

for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function drawCircle() {
  // 確認是否打到磚塊
  brickArray.forEach((brick, index) => {
    if (brick.touchingBall(circle_x, circle_y)) {
      // 從下方撞擊
      if (circle_y >= brick.y + brick.height) {
        ySpeed *= -1;
      }
      // 從上方撞擊
      else if (circle_y <= brick.y) {
        ySpeed *= -1;
      }
      // 從左方撞擊
      else if (circle_x <= brick.x) {
        xSpeed *= -1;
      }
      // 從右方撞擊
      else if (circle_x >= brick.x + brick.width) {
        xSpeed *= -1;
      }
      brickArray.splice(index, 1);
      if (brickArray.length == 0) {
        alert("遊戲結束");
        clearInterval(game);
      }
    }
  });
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }

  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  if (circle_y <= radius) {
    ySpeed *= -1;
  }

  circle_x += xSpeed;
  circle_y += ySpeed;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  brickArray.forEach((brick) => {
    brick.drawBrick();
  });

  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, ground_height);

  // (x, y, radius, startAngle, endAngle)
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
