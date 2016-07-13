const Map = require('./map');

class GameView {
  constructor(root, game){
    this.root = root;
    this.game = game;
    this.map = new Map();
  }

  textRender(){
    this.root.innerHTML = this.map.render();
  }


  // setupGrid() {
  //   let html = "";
  //
  //   for (let i = 0; i < this.board.dim; i++) {
  //     html += "<ul>";
  //     for (let j = 0; j < this.board.dim; j++) {
  //       html += "<li></li>";
  //     }
  //     html += "</ul>";
  //   }
  //
  //   this.$el.html(html);
  //   this.$li = this.$el.find("li");
  // }

  step () {
    // this.board.moveWaves();
    this.textRender();
      // window.clearInterval(this.intervalId);
  }

};

module.exports = GameView;
