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
	const GameConstants = __webpack_require__(10);
	
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
	      if (this.level <= 5) {
	        this.passCallback();
	      } else {
	        this.winningCallback();
	      }
	    } else if (this.playerKilled()){
	      this.losingCallback();
	    } else {
	      requestAnimationFrame(this.step.bind(this));
	    }
	  }
	};
	
	GameView.KEYS = {};
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	const Ray = __webpack_require__(5);
	const Util = __webpack_require__(6);
	const Wall = __webpack_require__(7);
	const Player = __webpack_require__(8);
	const Monster = __webpack_require__(9);
	const GameConstants = __webpack_require__(10);
	
	class Map {
	  constructor(canvas, level){
	    this.rays = [];
	    this.level = GameConstants.LEVELS[level];  //change back to level variable
	    this.walls = this.level["walls"]
	                  .map(row => {
	                    return row.map((scalar, index) => {
	                      if (index % 2 === 0) {
	                        return scalar * canvas.width;
	                      } else {
	                        return scalar * canvas.height;
	                      }
	                    });
	                  })
	                  .map(info => new Wall(...info));
	    window.player = this.player = new Player(
	      this.level.playerStart.x * canvas.width,
	      this.level.playerStart.y * canvas.height,
	      this
	    );
	
	    this.monsters = [];
	    if (this.level.monsters) {
	      this.monsters = this.level.monsters.map( monsterStart => {
	        return new Monster(
	          monsterStart.x * canvas.width,
	          monsterStart.y * canvas.height,
	          this,
	          monsterStart.active
	        );
	      });
	    }
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
	
	  inBounds(coord){
	    return !(
	      (coord.x < 0) || (coord.y < 0)
	      || (coord.x > canvas.width) || (coord.y > canvas.height)
	    );
	  }
	
	  cullRays(){
	    this.rays = this.rays.filter(ray => {
	      return (
	        (ray.age < Ray.LIFESPAN) &&
	        (ray.body.length > 0)
	      );
	    });
	
	  }
	
	  moveRays(){
	    for (let ray of this.rays) {
	      ray.move();
	    }
	  }
	
	  moveMonsters(){
	    for (let monster of this.monsters) {
	      monster.move();
	    }
	  }
	
	  playerKilled(){
	    return this.monsters.some(monster => {
	      if (!monster.active) { return; }
	      return monster.pos.equals(this.player.pos);
	    });
	  }
	
	  step(){
	    this.cullRays();
	    this.moveRays();
	    this.moveMonsters();
	  }
	
	  draw(ctx){
	    this.player.draw(ctx);
	    this.rays.forEach(ray => ray.draw(ctx));
	    this.walls.forEach(wall => wall.draw(ctx)); //remove this on release
	  }
	};
	
	
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
	    return (Math.abs(Math.floor(this.x) - Math.floor(otherCoord.x)) < 3)
	      && (Math.abs(Math.floor(this.y) - Math.floor(otherCoord.y)) < 3)
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
	
	    this.age = (age) ? age : Math.random(20);
	    this.maxLength =  Ray.MAX_LENGTH + Math.random(20); //(maxLength) ? maxLength :
	    this.fading = false;
	  }
	
	  move(){
	    // if (this.age < (Ray.LIFESPAN - 60)) {
	      if (this.handleCollisions() === false){
	        this.growHead();
	      }
	    // }
	
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
	
	      reflection.monster = this.monster;
	
	      this.map.rays.push(reflection);
	      // console.log(this.map.rays.length);
	
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
	    this.body.push(this.head);
	
	    //wake monsters if ray hits 'em
	    let sleepingMonsters = [];
	    if (this.map.monsters) {
	      sleepingMonsters = this.map.monsters.filter((monster)=>{
	        return !monster.active;
	      });
	      for (let sleepingMonster of sleepingMonsters) {
	        if (sleepingMonster.pos.equals(this.head)) {
	          sleepingMonster.activate();
	        }
	      }
	    }
	  }
	
	  fadeTail(){
	    let i = 0;
	    while (i < Ray.VELOCITY) {
	      this.body.shift();
	      i += 1;
	    }
	    this.tail = this.body[0];
	  }
	
	  draw(ctx){
	    if (this.body.length === 0) return;
	
	    ctx.lineWidth = Ray.THICKNESS;
	
	    // linear gradient from start to end of line
	    const grad = ctx.createLinearGradient(
	      this.head.x, this.head.y,
	      this.tail.x, this.tail.y
	    );
	
	    this.colors = (this.monster) ? Ray.MONSTER_COLORS : Ray.COLORS;
	    let headColor = this.colors.HEAD_COLOR;
	
	    if (this.age > Ray.LIFESPAN - 100) {
	      headColor = this.colors.FADING_HEAD_COLOR;
	    }
	
	    if (this.age > Ray.LIFESPAN - 20) {
	      headColor = this.colors.FADED_HEAD_COLOR;
	    }
	
	    grad.addColorStop(0, headColor);
	    grad.addColorStop(1, this.colors.TAIL_COLOR);
	
	    ctx.strokeStyle = grad;
	
	    ctx.beginPath();
	    ctx.moveTo(this.head.x, this.head.y);
	    ctx.lineTo(this.tail.x, this.tail.y);
	
	    ctx.stroke();
	  }
	};
	
	Ray.MAX_LENGTH = 60;
	Ray.COLORS = {
	  HEAD_COLOR: "#fff",
	  FADING_HEAD_COLOR: "#aaa",
	  FADED_HEAD_COLOR: "#7f7f7f",
	  TAIL_COLOR: "#222"
	};
	
	Ray.MONSTER_COLORS = {
	  HEAD_COLOR: "#F00",
	  FADING_HEAD_COLOR: "#a55",
	  FADED_HEAD_COLOR: "#7f2222",
	  TAIL_COLOR: "#222"
	};
	
	Ray.VELOCITY = 2;
	Ray.LIFESPAN = 200;
	Ray.THICKNESS = 1;
	
	const rt3oTwo = Math.sqrt(3)/2;
	const cos15 = Math.cos((15/180) * Math.PI);
	const sin15 = Math.sin((15/180) * Math.PI);
	Ray.DIRECTIONS = [
	  [0, 1],
	  [0, -1],
	  [-1, 0],
	  [1, 0],
	  [1/2, rt3oTwo],
	  [1/2, -rt3oTwo],
	  [-1/2, rt3oTwo],
	  [-1/2, -rt3oTwo],
	  [rt3oTwo, 1/2],
	  [-rt3oTwo, 1/2],
	  [rt3oTwo, -1/2],
	  [-rt3oTwo, -1/2],
	  [cos15,sin15],
	  [-cos15,sin15],
	  [cos15,-sin15],
	  [-cos15,-sin15],
	  [sin15,cos15],
	  [-sin15,cos15],
	  [sin15,-cos15],
	  [-sin15,-cos15],
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
	    window.fillStyle = () => window.wallColor;
	    ctx.fillStyle = window.fillStyle().color;
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
	    const exploreCoordTopLeft = new Coord(newX - 4, newY - 4);
	    const exploreCoordBottomLeft = new Coord(newX - 4, newY + 4);
	    const exploreCoordTopRight = new Coord(newX + 4, newY - 4);
	    const exploreCoordBottomRight = new Coord(newX + 4, newY + 4);
	
	    if (
	      this.map.collidingWithWall(exploreCoordTopLeft) ||
	      this.map.collidingWithWall(exploreCoordBottomLeft) ||
	      this.map.collidingWithWall(exploreCoordTopRight) ||
	      this.map.collidingWithWall(exploreCoordBottomRight)
	    ) { return; }
	
	    this.pos = exploreCoord;
	    // this.emitRays();
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
	
	  escaped(){
	    return !this.map.inBounds(this.pos);
	  }
	};
	
	const rt2oTwo = Math.sqrt(2)/2;
	
	Player.SPEED = 1.5;
	Player.MOVES = {
	  "U": [0, -1],
	  "D": [0, 1],
	  "UL": [-rt2oTwo, -rt2oTwo],
	  "DL": [-rt2oTwo, rt2oTwo],
	  "L": [-1, 0],
	  "R": [1, 0],
	  "UR": [rt2oTwo, -rt2oTwo],
	  "DR": [rt2oTwo, rt2oTwo]
	}
	
	module.exports = Player;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	const Ray = __webpack_require__(5);
	
	class Monster {
	  constructor(startX, startY, map, active){
	    this.pos = new Coord(startX, startY);
	    this.map = map;
	    if (active) { this.activate(); }
	  }
	
	  emitRays(){
	    const newRays = Ray.DIRECTIONS.map(dir => {
	      let dirVector = new Coord(dir[0], dir[1]);
	      let ray = new Ray(this.pos, dirVector, this.map);
	      ray.monster = true;
	      return ray;
	    });
	    newRays.forEach( ray => {
	      this.map.rays.push(ray);
	    });
	  }
	
	  currentCourse(){
	    const vector = [
	      this.map.player.pos.x - this.pos.x,
	      this.map.player.pos.y - this.pos.y
	    ];
	
	    const magnitude = Math.sqrt(
	      Math.pow(vector[0], 2) + Math.pow(vector[1], 2)
	    );
	
	    const unitVector = vector.map(coordinate => {
	      return coordinate / magnitude;
	    });
	
	    return new Coord(unitVector[0], unitVector[1]);
	  }
	
	  activate(){
	    this.active = true;
	    this.emitRays();
	    this.emitInterval = setInterval( () => { this.emitRays() }, 400);
	  }
	
	  move(){
	    if (this.active) {
	      const dir = this.currentCourse();
	      const newX = this.pos.x + (dir.x * Monster.SPEED)
	      const newY = this.pos.y + (dir.y * Monster.SPEED)
	      let exploreCoord = new Coord(newX, newY);
	
	      if (this.map.collidingWithWall(exploreCoord)) {
	        exploreCoord = new Coord(
	          this.pos.x + (dir.x * Monster.SPEED),
	          this.pos.y
	        )
	        if (this.map.collidingWithWall(exploreCoord)){
	          exploreCoord = new Coord(
	            this.pos.x,
	            this.pos.y + (dir.y * Monster.SPEED)
	          )
	        } if (this.map.collidingWithWall(exploreCoord)) {
	          return;
	        }
	      }
	
	      this.pos = exploreCoord;
	    }
	
	  }
	};
	
	Monster.SPEED = 1.5;
	
	module.exports = Monster;


/***/ },
/* 10 */
/***/ function(module, exports) {

	window.wallColor = {color: "#222"};
	
	module.exports = {
	  LEVELS : {
	    1: {
	      walls: [
	        [0, 0, 0.01, 1],
	        [0, 0.35, 0.75, 0.4],
	        [0, 0.6, 0.6, 0.65],
	        [0.7, 0.35, 0.75, 1],
	        [0.55, 0.65, 0.6, 1]
	      ],
	      playerStart: {x: .05, y: .47},
	      level_header: "BUT HMMM...  WHAT'S THIS...?",
	      level_header_2: "THE NEXT FLOOR IS HUGE! YOU'LL NEED TO CLAP MUCH MORE TO FIND MY WAY..."
	    },
	    2: {
	      walls: [
	        [0.35, 0, 0.5, 0.05],
	        [0.35, 0, 0.4, 0.3],
	        [0.5, 0, 0.55, 0.3],
	        [0, .25, .35, .3],
	        [.25, .3, .3, .35],
	        [0, .35, .3, .4],
	        [.15, .4, .2, .55],
	        [.2, .5, .3, .55],
	        [.25, .55, .3, .6],
	        [.25, .6, .4, .65],
	        [.35, .65, .4, .7],
	        [.35, .4, .5, .5],
	        [.4, .67, .6, .7],
	        [.55, .25, .6, .3],
	        [.6, .15, .8, .2],
	        [.6, .2, .65, .4],
	        [.5, .4, .65, .45],
	        [.8, .15, .85, .4],
	        [.7, .4, 1, .45],
	        [.78, .45, .8, .5],
	        [.63, .55, .95, .57],
	        [.99, .45, 1, .5],
	        [.6, .7, .61, 1],
	        [.8, .65, .81, .9],
	        [.61, .99, 1, 1],
	        [.9, .57, .91, 1],
	        [.91, .65, 1, .73]
	      ],
	      playerStart: {x: .45, y: .07},
	      level_header: "YOU'RE GETTING THE HANG OF THIS.",
	      level_header_2: "BUT WAIT. A RUSTLE AROUND THE CORNER. IS SOMETHING THERE?"
	    },
	    3: {
	      walls: [
	        [0, 0, 0.01, 1],
	        [0, 0.35, 0.75, 0.4],
	        [0, 0.6, 0.6, 0.65],
	        [0.7, 0.35, 0.75, 1],
	        [0.55, 0.65, 0.6, 1]
	      ],
	      playerStart: {x: .1, y: .47},
	      monsters: [
	        {x: .06, y: .17, active: true},
	        {x: .06, y: .97, active: true}
	      ],
	      level_header: "WHEW. NO BIGGIE. PROBABLY THE ONLY TWO AROUND.",
	      level_header_2: "STILL... IT MIGHT BE GOOD TO MAKE LESS NOISE..."
	    },
	    4: {
	      walls: [
	        [0, 0.35, 0.6, 0.45],
	        [0, 0.53, 0.75, 0.65],
	        [0.7, 0, 0.75, .65],
	        [0.55, 0, 0.6, .35]
	      ],
	      playerStart: {x: .1, y: .49},
	      monsters: [
	        {x: .4, y: .52}
	      ],
	      level_header: "WHEW, CANT WAKE ANY MORE OF THOSE UP... YOU FEEL IN FRONT OF YOU... A SMALL BRAILLE SIGN.",
	      level_header_2: "'THE KILLING FLOOR'. WHAT?? YOU DON'T RECALL THIS ROOM..."
	    },
	    5: {
	      walls: [
	        [0, 0, .18, 0.1],
	        [.25, 0, 1, 0.1],
	        [.1, .18, .14, .22],
	        [.2, .18, .45, .22],
	        [.1, 0, .14, .4],
	        [.2, .22, .24, .4],
	        [.41, .22, .45, .4],
	        [.55, .18, .9, .22],
	        [.55, .22, .59, .4],
	        [.86, .22, .9, .4],
	        [.1, .78, .45, .82],
	        [.1, .6, .14, .8],
	        [.41, .6, .45, .8],
	        [.55, .78, .9, .82],
	        [.55, .6, .59, .8],
	        [.86, .6, .9, .8],
	        [0, 0, 0.04, 1],
	        [0, .96, 1, 1],
	        [.96, 0, 1, 1],
	        [.96, .55, 1, 1]
	      ],
	      playerStart: {x: .05, y: .5},
	      monsters: [
	        // {x: .05, y: .25},
	        {x: .85, y: .15},
	        {x: .15, y: .22},
	        {x: .2, y: .04},
	        {x: .5, y: .9}
	      ],
	      level_header: "DISPAIR. AT THIS RATE YOU'LL NEVER MAKE IT OUT",
	      level_header_2: "BUT WHAT'S THIS... A GUST OF FRESH AIR..? COULD IT BE...?"
	    },
	    6: {
	      walls: [
	        [0.35, 0, 0.5, 0.05],
	        [0.35, 0, 0.4, 0.3],
	        [0.5, 0, 0.55, 0.3],
	        [0, .25, .35, .3],
	        [.25, .3, .3, .35],
	        [0, .35, .3, .4],
	        [.15, .4, .2, .55],
	        [.2, .5, .3, .55],
	        [.25, .55, .3, .6],
	        [.25, .6, .4, .65],
	        [.35, .65, .4, .7],
	        [.35, .4, .5, .5],
	        [.4, .67, .6, .7],
	        [.55, .25, .6, .3],
	        [.6, .15, .8, .2],
	        [.6, .2, .65, .4],
	        [.5, .4, .65, .45],
	        [.8, .15, .85, .4],
	        [.7, .4, 1, .45],
	        [.78, .45, .8, .5],
	        [.63, .55, .95, .57],
	        [.7, .72, .74, .74],
	        [.99, .45, 1, .5],
	        [.6, .7, .61, 1],
	        [.8, .65, .81, .9],
	        [.61, .99, 1, 1],
	        [.9, .57, .91, 1],
	        [.91, .65, 1, .73]
	      ],
	      playerStart: {x: .45, y: .07},
	      monsters: [
	        {x: .21, y: .45}
	      ]
	    },
	  }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map