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
	
	  const ctx = canvas.getContext("2d");
	  ctx.fillStyle = "#222";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(5);
	const Ray = __webpack_require__(7);
	const Util = __webpack_require__(6);
	
	class Map {
	  constructor(canvas){
	    const pegCoord = new Coord(3, 3);
	    const dirCoord = new Coord(1, 2);
	    const testRay = new Ray(pegCoord, dirCoord, this);
	    window.rays = this.rays = [ testRay ];
	    this.walls = [];
	    this.canvas = canvas;
	  }
	
	  cullRays(){
	    this.rays = this.rays.filter(ray => {
	      return ray.age < Ray.LIFESPAN;
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
	    this.rays.forEach(ray => ray.draw(ctx));
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
	  constructor(origin, direction, map){
	    this.body = [origin];  //origin is coord object
	    this.head = origin;
	    this.tail = origin;
	    this.map = map;
	
	    this.direction = direction; //direction is coord object
	    this.speed = Ray.VELOCITY;
	
	    this.age = 0;
	    this.fading = false;
	  }
	
	  move(){
	    if (this.age < (Ray.LIFESPAN - 60)) {
	      this.handleCollisions();
	      this.growHead();
	    }
	
	    if (this.body.length > Ray.MAX_LENGTH){
	      this.fading = true;
	    }
	
	    if (this.fading) {
	      this.fadeTail()
	    }
	
	    this.age += 1;
	  }
	
	  handleCollisions(){
	    // move head x and ask map if collided with wall
	    // move head y and ask map if collided with wall
	    // alter this.direction coord to reflect one or both bounces as needed
	  }
	
	  growHead(){
	    const newX = this.head.x + (this.direction.x * this.speed);
	    const newY = this.head.y + (this.direction.y * this.speed);
	    this.head = new Coord(newX, newY);
	    this.body.push(this.head); // collision logic could be added before this push
	  }
	
	  fadeTail(){
	    let i = 0;
	    while (i < Ray.VELOCITY) {
	      this.body.shift();
	      i += 1;
	    }
	    this.tail = this.body[0];
	  }
	
	  bounce(){
	
	    // this.direction x or y should invert depending on nature of collision
	  }
	
	  draw(ctx){
	    if (this.body.length === 0) return;
	
	    ctx.lineWidth = Ray.THICKNESS;
	
	    // linear gradient from start to end of line
	    const grad = ctx.createLinearGradient(
	      this.head.x, this.head.y,
	      this.tail.x, this.tail.y
	    );
	    grad.addColorStop(0, Ray.HEAD_COLOR);
	    grad.addColorStop(1, Ray.TAIL_COLOR);
	
	    ctx.strokeStyle = grad;
	
	    ctx.beginPath();
	    ctx.moveTo(this.head.x, this.head.y);
	    ctx.lineTo(this.tail.x, this.tail.y);
	
	    ctx.stroke();
	  }
	};
	
	Ray.MAX_LENGTH = 40;
	Ray.HEAD_COLOR = "#fff";
	Ray.TAIL_COLOR = "#222";
	Ray.VELOCITY = 1;
	Ray.LIFESPAN = 200;
	Ray.THICKNESS = 1;
	
	module.exports = Ray;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map