const Map = require('./map');

class GameView {
  constructor(canvas, map){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = new Map(canvas);
    this.player = this.map.player;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", (e) => {
      console.log("keydown");
      GameView.KEYS[e.keyCode] = true;
    });

    window.addEventListener("keyup", (e) => {
      console.log("keyup");
      GameView.KEYS[e.keyCode] = false;
    });

    window.addEventListener("keydown", (e)=>{
      if (e.keyCode === 32) { player.emitRays(); }
    });
  }

  whatKey(){
    const player = this.player;
    if (GameView.KEYS[37] && GameView.KEYS[38]) {
      player.move("UL");
    } else if (GameView.KEYS[37] && GameView.KEYS[40]){
      player.move("DL")
    } else if (GameView.KEYS[39] && GameView.KEYS[38]){
      player.move("UR");
    } else if (GameView.KEYS[39] && GameView.KEYS[40]){
      player.move("DR");
    } else if (GameView.KEYS[37]) {
      player.move("L");
    } else if (GameView.KEYS[39]) {
      player.move("R");
    } else if (GameView.KEYS[38]) {
      player.move("U");
    } else if (GameView.KEYS[40]) {
      player.move("D");
    }
  }

  start(){
    //bind key handlers
    this.bindKeyHandlers();
    this.whatKey();
    //start animation
    requestAnimationFrame(this.step.bind(this));
  }

  step () {
    this.whatKey();
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.map.step();
    this.map.draw(this.ctx);

    //request another animation
    requestAnimationFrame(this.step.bind(this));

    // when game is over
    // window.clearInterval(this.intervalId);
  }

};

GameView.KEYS = {};

GameView.MOVES = {
  "up": "U",
  "down": "D",
  "left": "L",
  "right": "R"
};

module.exports = GameView;
