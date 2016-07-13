const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", ()=>{
  console.log("Hey there");
  const root = document.getElementById('root');
  const game = new Game();
  window.GameView = new GameView(root, game);
});
