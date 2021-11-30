const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "green";
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    this.update();
  }
  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const circlesArray = [];

for (let i = 0; i < 1000; i++) {
  let radius = Math.random() * 15;
  let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
  let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
  let dx = (Math.random() - 0.5) * 3;
  let dy = (Math.random() - 0.5) * 15;
  const random16 = () => Math.floor(Math.random() * 16 * 16).toString(16);
  let color = `#${random16()}${random16()}${random16()}`;
  circlesArray.push(new Circle(x, y, radius, dx, dy, color));
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].draw();
  }
}

animate();
