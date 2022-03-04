import { settings } from "./settings.js";

const versionButtons = document.querySelector(".versionButtons");
const canvas = document.querySelector("canvas");

const W = window.innerWidth;
const H = window.innerHeight;
let animateId = null;

canvas.width = W;
canvas.height = H;
const c = canvas.getContext("2d");

class Circle {
  constructor(x, y, rad, dx, dy, color, colorBorder, move) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.colorBorder = colorBorder;
    this.move = move;
    this.memoDx = this.dx;
    this.memoDy = this.dy;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    c.strokeStyle = this.colorBorder;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    this.update();
  }
  update() {
    if (this.x + this.rad > W || this.x - this.rad < 0) this.dx = -this.dx;
    if (this.y + this.rad > H || this.y - this.rad < 0) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    if (this.move === "random") {
      this.dx = (Math.random() - 0.5) * this.memoDx;
      this.dy = (Math.random() - 0.5) * this.memoDy;
    }
  }
}

const versionHandler = (e) => {
  const h1 = document.body.querySelector("h1");
  h1 && h1.remove();
  cancelAnimationFrame(animateId);
  c.clearRect(0, 0, W, H);
  const data = settings[e.target.id - 1];
  document.body.style.backgroundColor = data.background;

  const circlesArray = [];

  for (let i = 0; i < data.numbers; i++) {
    const rand = () => Math.random();
    let rad = rand() * data.rad;
    let x = rand() * (W - 2 * rad) + rad;
    let y = rand() * (H - 2 * rad) + rad;
    let dx = (rand() - 0.5) * data.dx;
    let dy = (rand() - 0.5) * data.dy;
    const hex = () => Math.floor(rand() * 16 * 16).toString(16);
    let color =
      data.color === "random" ? `#${hex()}${hex()}${hex()}` : data.color;
    let colorBorder =
      data.colorBorder === "random"
        ? `#${hex()}${hex()}${hex()}`
        : data.colorBorder;
    circlesArray.push(
      new Circle(x, y, rad, dx, dy, color, colorBorder, data.move)
    );
  }

  function animate() {
    data.trace ? null : c.clearRect(0, 0, W, H);
    for (let i = 0; i < circlesArray.length; i++) {
      circlesArray[i].draw();
    }
    animateId = requestAnimationFrame(animate);
  }

  animate();
};

function render() {
  const buttons = settings.map((item) => {
    const button = document.createElement("button");
    button.addEventListener("click", versionHandler);
    button.innerText = `Version ${item.id}`;
    button.id = item.id;
    return button;
  });
  versionButtons.replaceChildren(...buttons);
}

render();
