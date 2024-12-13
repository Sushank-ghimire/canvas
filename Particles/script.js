// Global Variables
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let height = window.innerHeight;
let width = window.innerWidth;

const linearGradient = context.createLinearGradient(
  0,
  0,
  canvas.width,
  canvas.height
);

class Particles {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 15 + 7;
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2.5);
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2.5);
    this.vX = Math.random() * 4 - 2.5;
    this.vY = Math.random() * 4 - 2.5;
  }

  draw(context) {
    // context.fillStyle = `hsl(${this.x * 0.4}, 100%, 55%)`;

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  updateParticles() {
    this.x += this.vX;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) {
      this.vX *= -1;
    }
    this.y += this.vY;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) {
      this.vY *= -1;
    }
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 250;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      const particle = new Particles(this);
      this.particles.push(particle);
    }
  }

  handleParticles(context) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.updateParticles();
    });
  }

  connectParticles(context) {
    const maxDistance = 150;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const distanceX = this.particles[i].x - this.particles[j].x;
        const distanceY = this.particles[i].y - this.particles[j].y;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance < maxDistance) {
          context.strokeStyle = `rgba(255, 255, 255, ${
            1 - distance / maxDistance
          })`; // Set opacity based on distance
          context.beginPath();
          context.moveTo(this.particles[i].x, this.particles[i].y);
          context.lineTo(this.particles[j].x, this.particles[j].y);
          context.stroke();
        }
      }
    }
  }
}

// Main function
function main() {
  canvas.width = width;
  canvas.height = height;
  linearGradient.addColorStop(0, "red");
  linearGradient.addColorStop(0.5, "pink");
  linearGradient.addColorStop(1, "indigo");
  context.fillStyle = linearGradient;

  const effect = new Effect(canvas);

  function animation() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(context);
    requestAnimationFrame(animation);
  }

  animation();
}

const handleWindowResize = () => {
  height = window.innerHeight;
  width = window.innerWidth;
  main();
};

window.addEventListener("resize", handleWindowResize);

document.addEventListener("DOMContentLoaded", () => {
  main();
});
