/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", ()=>{
	  console.log("Hey there");
	  const root = document.getElementById('root');
	  const game = new Game();
	  window.GameView = new GameView(root, game);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor(){
	    // this.grid =
	  }
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Map = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Wave = __webpack_require__(4);
	
	class Map {
	  constructor(){
	    this.waves = [ new Wave(3, 3) ];
	  }
	
	  blankMap(){
	    return (
	      [
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "X", "__", "__", "__", "X", "__", "__"],
	        ["__", "__", "__", "__", "__", "__", "__", "__"]
	      ]
	    );
	  }
	
	  isWall(coord) {
	    return (this.grid[coord.y][coord.x] === "X");
	  }
	
	  inBounds(coord) {
	    return (coord.y >= 0) && (coord.y < this.grid.length)
	        && (coord.x >= 0) && (coord.x < this.grid[0].length);
	  }
	
	  //simple text based render
	  render(){
	    const map = this.blankMap();
	
	    return map.map( row => row.join("")).join("</br>");
	  }
	};
	
	module.exports = Map;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(5);
	
	class Wave {
	  constructor(x, y){
	    this.coord = new Coord(x, y);
	    this.front = [ this.coord ];
	    this.seen = [this.coord ];
	    this.strength = 4;
	  }
	
	  spread(){
	    //breadth-first explore
	    const newFront = [];
	    this.front.forEach(coord => {
	      coord.getAdjacentCoords().forEach(adjCoord => {
	        if (
	          this.seen.some( intCord => {
	            return intCoord.equals(adjCoord);
	          })
	        ) {
	          return;
	        } else {
	          this.newFront.push(adjCoord);
	          this.seen.push(adjCoord);
	        }
	      });
	    });
	
	    this.front = newFront;
	  }
	};
	
	module.exports = Wave;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Coord {
	  constructor(x, y){
	    this.x = x;
	    this.y = y;
	  }
	
	  equals(otherCoord){
	    return (this.x === otherCoord.x)
	      && (this.y === otherCoord.y)
	  }
	
	  getAdjacentCoords(){
	    return Coord.MOVES.map(move => {
	      const newX = this.x + move[0];
	      const newY = this.y + move[1];
	      return new Coord(newX, newY);
	    });
	  }
	}
	
	Coord.MOVES = [
	  [0, 1],
	  [0, -1],
	  [1, 0],
	  [-1, 0],
	  [1, 1],
	  [1, -1],
	  [-1, 1],
	  [-1, -1]
	];
	
	module.exports = Coord;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map