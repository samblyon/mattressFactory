const Map = require('./map');

class GameView {
  constructor(canvas, map){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = new Map(canvas);
    this.player = this.map.player;
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    const player = this.player;

    Object.keys(GameView.MOVES).forEach((k) => {
      let dir = GameView.MOVES[k];
      key(k, function () { player.move(dir); });
    });

    key("space", function () { player.emitRays() });
  }

  start(){
    //bind key handlers

    //start animation
    requestAnimationFrame(this.step.bind(this));
  }

  step () {
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

GameView.MOVES = {
  "up": "U",
  "down": "D",
  "left": "L",
  "right": "R"
}

module.exports = GameView;
