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
	  const canvas = document.getElementById('canvas');
	  canvas.width = 400;
	  canvas.height = 400;
	  ctx.fillStyle = "#222";
	  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	
	  const ctx = canvas.getContext("2d");
	  const map = new Map();
	  window.GameView = new GameView(canvas, map);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Ray = __webpack_require__(7);
	const Util = __webpack_require__(6);
	
	class Map {
	  constructor(canvas){
	    const pegCoord = new Coord(3, 3);
	    const dirCoord = new Coord(1, 2);
	    const testRay = new Ray(pegCoord, dirCoord);
	    this.rays = [ testRay ];
	    this.walls = [];
	    this.canvas = canvas;
	  }
	
	  cullRays(){
	    this.rays = this.rays.filter(ray => {
	      return ray.age < 10;
	    });
	  }
	
	  moveRays(){
	    for (let ray of this.rays) {
	      ray.move();
	    }
	  }
	
	  step(){
	    this.cullRays();
	    this.moveRays();
	  }
	
	  draw(ctx){
	    // draw objects
	    // draw rays
	  }
	};
	
	module.exports = Map;


/***/ },
/* 4 */,
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	  inherits(Child, Parent) {
	    function Surrogate (){};
	    Surrogate.prototype = Parent.prototype;
	    Child.prototype = new Surrogate();
	    Child.prototype.constructor = Child;
	  },
	
	  // inBounds(coord) {
	  //   return (coord.y >= 0) && (coord.y < this.grid.length)
	  //   && (coord.x >= 0) && (coord.x < this.grid[0].length);
	  // }
	
	  // isWall(coord) {
	  //   return (this.grid[coord.y][coord.x] === "X");
	  // }
	
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(5);
	
	class Ray {
	  constructor(origin, direction){
	    this.body = [this.origin];  //origin is coord object
	    this.head = this.body[this.length - 1];
	    this.tail = this.body[0];
	    this.length = this.body.length;
	
	    this.direction = direction; //direction is coord object
	    this.speed = Ray.VELOCITY;
	
	    this.age = 0;
	  }
	
	  move(){
	    // if not at max length, add head
	    // if at max length, just shift off tail
	    if (this.length < Ray.MAX_LENGTH) {
	      const newX = this.head.x + (this.direction.x * this.speed);
	      const newY = this.head.y + (this.direction.y * this.speed);
	      this.body.push(Coord.new(newX, newY)); // collision logic could be added before this push
	    } else {
	      this.body.shift();
	    }
	
	    this.age += 1;
	  }
	
	  bounce(){
	
	  }
	
	  draw(ctx){
	    ctx.lineWidth = 5;
	
	    // linear gradient from start to end of line
	    const grad = ctx.createLinearGradient(
	      this.head.x, this.head.y,
	      this.tail.x, this.tail.y
	    );
	    grad.addColorStop(0, Ray.TAIL_COLOR);
	    grad.addColorStop(1, Ray.HEAD_COLOR);
	
	    ctx.strokeStyle = grad;
	
	    ctx.beginPath();
	    ctx.moveTo(this.head.x, this.head.y);
	    ctx.lineTo(this.tail.x, this.tail.y);
	
	    ctx.stroke();
	  }
	};
	
	Ray.MAX_LENGTH = 400;
	Ray.HEAD_COLOR = "#fff";
	Ray.TAIL_COLOR = "#222";
	Ray.VELOCITY = 0.5;
	
	module.exports = Ray;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map