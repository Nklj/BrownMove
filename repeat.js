const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const W = window.innerWidth;
const H = window.innerHeight;

class Circle {
  constructor(x, y, rad, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    //c.fill();
    c.stroke();
    this.update();
  }
  update() {
    if (this.x + this.rad > W || this.x - this.rad < 0) this.dx = -this.dx;
    if (this.y + this.rad > H || this.y - this.rad < 0) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
  }
}

const circlesArr = [];

for (let i = 0; i < W; i++) {
  const rand = () => Math.random();
  let rad = rand() * 15;
  let x = rand() * (W - 2 * rad) + rad;
  let y = rand() * (H - 2 * rad) + rad;
  let dx = (rand() - 0.5) * 5;
  let dy = (rand() - 0.5) * 5;
  const hex = () => Math.floor(rand() * 16 * 16).toString(16);
  let color = `#${hex()}${hex()}${hex()}`;
  circlesArr.push(new Circle(x, y, rad, dx, dy, color));
}

function animate() {
  requestAnimationFrame(animate);
  //c.clearRect(0, 0, W, H);
  for (let i = 0; i < circlesArr.length; i++) {
    circlesArr[i].draw();
  }
}

animate();
