document.addEventListener("DOMContentLoaded", () => {
  // Global Variable Declaration
  const canvas = document.querySelector("canvas");
  let height = window.innerHeight;
  let width = window.innerWidth;
  const context = canvas.getContext("2d");
  canvas.height = height;
  canvas.width = width;

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
      context.fillStyle = "#0aff0a";
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

  const animate = () => {
    context.fillStyle = `rgba(0, 0, 0, 0.05)`;
    context.fillRect(0, 0, width, height);
    context.font = effect.fontSize + "px cursive";
    effect.symbols.forEach((symbol) => {
      symbol.draw(context);
    });

    // Request the next animation frame
    requestAnimationFrame(animate);
  };

  animate();

  const main = () => {
    canvas.height = height;
    canvas.width = width;
  };

  window.addEventListener("resize", () => {
    height = window.innerHeight;
    width = window.innerWidth;
    main();
  });
});
