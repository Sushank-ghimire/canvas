// Canvas Basics

// Global Variable
let canvas, context;
let height = window.innerHeight;
let width = window.innerWidth;

const main = () => {
  canvas = document.querySelector("canvas");
  canvas.height = height;
  canvas.width = width;
  context = canvas.getContext("2d", { alpha: false });

  const rect = () => {
    // Set the fill color and fill the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    // Drawing a green box
    context.fillStyle = "white";
    context.fillRect(25, 25, 100, 100);
    context.clearRect(45, 45, 60, 60);
    context.strokeRect(50, 50, 50, 50);
  };

  const draw = () => {
    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(250, 250);
    context.lineTo(150, 75);
    context.lineTo(150, 25);
    context.lineTo(100, 50);
    context.lineTo(-50, 150);
    context.fill();
  };

  const circle = () => {
    context.beginPath();

    // Outer circle (face)
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Full circle
    context.fillStyle = "white";
    context.fill();
    context.strokeStyle = "black";
    context.stroke();

    // Mouth (smile)
    context.beginPath();
    context.arc(75, 75, 35, 0, Math.PI, false); // Half-circle for mouth
    context.stroke();

    // Left eye
    context.beginPath();
    context.arc(60, 65, 5, 0, Math.PI * 2, true);
    context.fillStyle = "black";
    context.fill();

    // Right eye
    context.beginPath();
    context.arc(90, 65, 5, 0, Math.PI * 2, true);
    context.fill();

    context.fillStyle = "white"
    context.fillText("Hello Canvas", 550, 20);
  };
  circle();
};

function updateWidth() {
  height = window.innerHeight;
  width = window.innerWidth;
  main();
}

// Use `window` for the resize event
window.addEventListener("resize", updateWidth);

// Initialize the canvas when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  main();
});
