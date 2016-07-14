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
	  window.GameView.start();
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
	    this.player = this.map.player;
	    this.bindKeyHandlers();
	  }
	
	  bindKeyHandlers() {
	    const player = this.player;
	
	    Object.keys(GameView.MOVES).forEach((k) => {
	      let dir = GameView.MOVES[k];
	      key(k, function () { player.move(dir); });
	    });
	
	    key("space", function () { player.emitRays() });
	  }
	
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
	
	GameView.MOVES = {
	  "up": "U",
	  "down": "D",
	  "left": "L",
	  "right": "R"
	}
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	const Ray = __webpack_require__(5);
	const Util = __webpack_require__(6);
	const Wall = __webpack_require__(7);
	const Player = __webpack_require__(8);
	
	class Map {
	  constructor(canvas){
	    const pegCoord = new Coord(20, 20);
	    const dirCoord = new Coord(1, 2);
	    const testRay = new Ray(pegCoord, dirCoord, this);
	    window.rays = this.rays = [];
	    this.walls = Map.LEVELS[1].map(info => new Wall(...info));
	    window.player = this.player = new Player(20, 20, this);
	    this.canvas = canvas;
	  }
	
	  collidingWithWall(coord){
	    return this.walls.some( wall => {
	      return !(
	        (coord.x < wall.topLeft.x)
	          || (coord.x > wall.bottomRight.x)
	          || (coord.y < wall.topLeft.y)
	          || (coord.y > wall.bottomRight.y)
	      );
	    });
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
	    this.player.draw(ctx);
	    this.rays.forEach(ray => ray.draw(ctx));
	    this.walls.forEach(wall => wall.draw(ctx)); //remove this on release
	  }
	};
	
	Map.LEVELS = {
	  1: [
	      [1, 1, 10, 399],
	      [1, 1, 399, 10],
	      [390, 1, 399, 399],
	      [1, 390, 370, 399],
	      [50, 200, 200, 210],
	      [100, 100, 110, 200],
	      [200, 40, 210, 100],
	      [200, 60, 320, 70],
	      [260, 70, 270, 300]
	    ]
	}
	
	module.exports = Map;


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
	class Ray {
	  constructor(origin, direction, map, age, maxLength){
	    this.body = [origin];  //origin is coord object
	    this.head = origin;
	    this.tail = origin;
	    this.map = map;
	
	    this.direction = direction; //direction is coord object
	    this.speed = Ray.VELOCITY;
	
	    this.age = (age) ? age : 0;
	    this.maxLength = (maxLength) ? maxLength : Ray.MAX_LENGTH;
	    this.fading = false;
	  }
	
	  move(){
	    if (this.age < (Ray.LIFESPAN - 60)) {
	      if (this.handleCollisions() === false){
	        this.growHead();
	      }
	    }
	
	    if (this.body.length > this.maxLength){
	      this.fading = true;
	    }
	
	    if (this.fading) {
	      this.fadeTail()
	    }
	
	    this.age += 1;
	  }
	
	  // move head x and ask map if collided with wall
	  // move head y and ask map if collided with wall
	  // alter this.direction coord to reflect one or both bounces as needed
	  handleCollisions(){
	    const newX = this.head.x + (this.direction.x * this.speed);
	    const xExplorer = new Coord(newX, this.head.y);
	    const xCollision = this.map.collidingWithWall(xExplorer);
	
	    const newY = this.head.y + (this.direction.y * this.speed);
	    const yExplorer = new Coord(this.head.x, newY);
	    const yCollision = this.map.collidingWithWall(yExplorer);
	
	    const zExplorer = new Coord(newX, newY);
	    const zCollision = this.map.collidingWithWall(zExplorer);
	
	    if (xCollision || yCollision || zCollision) {
	      // generate reflected ray
	
	      // reflect direction based on collision
	      const reflectionDirection = new Coord(this.direction.x, this.direction.y);
	      if (xCollision) {
	        reflectionDirection.x = -reflectionDirection.x;
	      } else if (yCollision) {
	        reflectionDirection.y = -reflectionDirection.y;
	      } else {
	        reflectionDirection.y = -reflectionDirection.y;
	        reflectionDirection.x = -reflectionDirection.x;
	      }
	
	      const origin = new Coord(this.head.x, this.head.y);
	      const reflection = new Ray(
	        origin,
	        reflectionDirection,
	        this.map,
	        this.age,        // advance new ray age to parent ray current age
	        this.body.length // set new ray max length
	      );
	
	      this.map.rays.push(reflection);
	      console.log(this.map.rays.length);
	
	      // stop expansion of current ray
	      this.direction.x = 0;
	      this.direction.y = 0;
	
	      return true;
	    } else {
	      return false;
	    }
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
	
	const rtTwo = Math.sqrt(2)/2;
	Ray.DIRECTIONS = [
	  [0, rtTwo],
	  [0, -rtTwo],
	  [-rtTwo, 0],
	  [rtTwo, 0],
	  [rtTwo, rtTwo],
	  [rtTwo, -rtTwo],
	  [-rtTwo, rtTwo],
	  [-rtTwo, -rtTwo]
	];
	
	
	module.exports = Ray;


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

	const Coord = __webpack_require__(4);
	
	class Wall {
	  constructor(topX, topY, bottomX, bottomY){
	    this.topLeft = new Coord(topX, topY);
	    this.bottomRight = new Coord(bottomX, bottomY);
	    this.width = bottomX - topX;
	    this.height = bottomY - topY;
	  }
	
	  draw(ctx){
	    ctx.fillStyle = "#222";
	    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
	  }
	}
	
	module.exports = Wall;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	const Ray = __webpack_require__(5);
	
	class Player {
	  constructor(startX, startY, map){
	    this.pos = new Coord(startX, startY);
	    this.map = map;
	  }
	
	  move(direction){
	    const newX = this.pos.x + (Player.MOVES[direction][0] * Player.SPEED)
	    const newY = this.pos.y + (Player.MOVES[direction][1] * Player.SPEED)
	    const exploreCoord = new Coord(newX, newY);
	
	    if (this.map.collidingWithWall(exploreCoord)) return;
	    this.pos = exploreCoord;
	    this.emitRays();
	  }
	
	  emitRays(){
	    const newRays = Ray.DIRECTIONS.map(dir => {
	      let dirVector = new Coord(dir[0], dir[1]);
	      return new Ray(this.pos, dirVector, this.map);
	    });
	    newRays.forEach( ray => {
	      this.map.rays.push(ray);
	    });
	  }
	
	  draw(ctx){
	    ctx.fillStyle = "#fff";
	    ctx.fillRect(this.pos.x, this.pos.y, 4, 4);
	  }
	};
	
	Player.SPEED = 5;
	Player.MOVES = {
	  "U": [0, -1],
	  "D": [0, 1],
	  "L": [-1, 0],
	  "R": [1, 0]
	}
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map