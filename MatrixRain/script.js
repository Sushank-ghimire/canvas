document.addEventListener("DOMContentLoaded", () => {
  // Global Variable Declaration
  const canvas = document.querySelector("canvas");
  let height = window.innerHeight;
  let width = window.innerWidth;
  const context = canvas.getContext("2d");
  canvas.height = height;
  canvas.width = width;

  let gradient = context.createLinearGradient(
    0,
    canvas.height,
    canvas.width,
    0
  );
  gradient.addColorStop(0, "red");
  gradient.addColorStop(0.2, "yellow");
  gradient.addColorStop(0.4, "indigo");
  gradient.addColorStop(0.6, "pink");
  gradient.addColorStop(0.8, "green");
  gradient.addColorStop(1, "blue");

  // Classes and Objects
  class Symbols {
    constructor(x, y, fontSize, canvasHeight) {
      this.characters =
        "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789abcdefghijklmnopqrstuvwxyz";
      this.x = x;
      this.y = y;
      this.fontSize = fontSize;
      this.text = "";
      this.canvasHeight = canvasHeight;
    }

    draw(context) {
      this.text = this.characters.charAt(
        Math.ceil(Math.random() * this.characters.length)
      );
      // context.fillStyle = "#0aff0a";
      context.fillText(
        this.text,
        this.x * this.fontSize,
        this.y * this.fontSize
      );
      if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
        this.y = 0;
      } else {
        this.y += 1;
      }
    }
  }

  class Effects {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.fontSize = 24;
      this.columns = this.canvasWidth / this.fontSize;
      this.symbols = [];
      this._initializeEffect();
    }

    // Abstraction the method
    _initializeEffect() {
      for (let i = 0; i < this.columns; i++) {
        this.symbols[i] = new Symbols(i, 0, this.fontSize, this.canvasHeight);
      }
    }
  }

  const effect = new Effects(width, height);
  let lastTime = 0;
  const fps = 17;
  const nextFrame = 1000 / fps;
  let timer = 0;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = deltaTime;

    if (timer > nextFrame) {
      context.fillStyle = `rgba(0, 0, 0, 0.05)`;
      context.textAlign = "center";
      context.fillRect(0, 0, width, height);
      context.fillStyle = gradient;
      context.font = effect.fontSize + "px cursive";
      effect.symbols.forEach((symbol) => {
        symbol.draw(context);
      });

      timer = 0;
    } else {
      timer += deltaTime;
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
  };

  animate(0.1);

  const main = () => {
    canvas.height = height;
    canvas.width = width;
  };

  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
    main();
  });
});
