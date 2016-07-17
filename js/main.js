const Game = require('./game.js');
const GameView = require('./game_view.js');
const GameConstants = require('./game_constants');

// Initialize canvas and display splash
document.addEventListener("DOMContentLoaded", ()=>{
  console.log("Hey there and welcome to Mattress Factory Escape");
  document.addEventListener("keydown", hideSplash);

  const canvas = document.getElementById('canvas');
  const body = document.getElementsByTagName('body')[0];
  canvas.width = body.offsetWidth;
  canvas.height = window.innerHeight - 80;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

let level = 1;

function pass(){
  const levelSplash = document.getElementById('level-splash');
  const victoryLine = document.getElementById('level-victory');
  victoryLine.innerHTML = `YOU HAVE BEATEN LEVEL ${level}`;

  ['level_header', 'level_header_2'].forEach(id => {
    let el = document.getElementById(id);
    el.innerHTML = GameConstants.LEVELS[level][id];
  });

  level += 1;
  levelSplash.style.visibility = "visible";
  setTimeout( () => {
    document.addEventListener("keydown", hideSplash)
  }, 2000);
}

function win(){
  const winSplash = document.getElementById('win-splash');
  const victoryLine = document.getElementById('level-victory');
  victoryLine.innerHTML = `YOU HAVE BEATEN LEVEL ${level}`;
  winSplash.style.visibility = "visible";
  level = 1;
  setTimeout( () => {
    document.addEventListener("keydown", hideSplash)
  }, 2000);
}

function lose(){
  const loseSplash = document.getElementById('lose-splash');
  loseSplash.style.visibility = "visible";
  setTimeout( () => {
    document.addEventListener("keydown", hideSplash)
  }, 2000);
}

function hideSplash(){
  const splashes = document.querySelectorAll('.splash');
  for (let splash of splashes) {
    splash.style.visibility = "hidden";
  }
  window.GameView = new GameView(canvas, pass, lose, win, level);
  window.GameView.start();
  document.removeEventListener("keydown", hideSplash);
}
