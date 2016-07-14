const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", ()=>{
  console.log("Hey there and welcome to Mattress Factory Escape");
  document.addEventListener("keydown", hideSplash);

  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function hideSplash(){
  const splash = document.getElementById('splash');
  splash.style.visibility = "hidden";
  const map = new Map();
  window.GameView = new GameView(canvas, map);
  window.GameView.start();
  document.removeEventListener("keydown", hideSplash);
}
