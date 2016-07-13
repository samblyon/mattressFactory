const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", ()=>{
  console.log("Hey there");
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const map = new Map();
  window.GameView = new GameView(canvas, map);
});
