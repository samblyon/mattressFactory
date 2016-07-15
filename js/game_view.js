const Map = require('./map');

class GameView {
  constructor(canvas, passCallback, losingCallback, winningCallback, level){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = new Map(canvas, level);
    this.player = this.map.player;
    this.passCallback = passCallback;
    this.winningCallback = winningCallback;
    this.losingCallback = losingCallback;
    this.level = level;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", (e) => {
      GameView.KEYS[e.keyCode] = true;
    });

    window.addEventListener("keyup", (e) => {
      GameView.KEYS[e.keyCode] = false;
    });

    window.addEventListener("keydown", (e)=>{
      if (e.keyCode === 32) { this.player.emitRays(); }
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

  playerEscaped(){
    return this.player.escaped();
  }

  playerKilled(){
    //ask map if player collided with monster
    return this.map.playerKilled();
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

    //request another animation or break if player won / lost
    if (this.playerEscaped()){
      if (this.level <= 4) {
        this.passCallback();
      } else {
        debugger;
        this.winningCallback();
      }
    } else if (this.playerKilled()){
      debugger;
      this.losingCallback();
    } else {
      requestAnimationFrame(this.step.bind(this));
    }
  }
};

GameView.KEYS = {};

module.exports = GameView;
