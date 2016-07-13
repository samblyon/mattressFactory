const Map = require('./map');

class GameView {
  constructor(canvas, map){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = new Map(canvas);
  }

  bindKeyHandlers() {}

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

GameView.MOVES = {}

module.exports = GameView;
