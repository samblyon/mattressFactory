const Coord = require('./coord');

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

    if (xCollision || yCollision) {
      this.direction.x = 0;    // NOTE do -this.direction.x; //-this.direction.y; later
      this.direction.y = 0;
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
Ray.DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [Math.sqrt(2)/2, Math.sqrt(2)/2],
  [Math.sqrt(2)/2, -Math.sqrt(2)/2],
  [-Math.sqrt(2)/2, Math.sqrt(2)/2],
  [-Math.sqrt(2)/2, -Math.sqrt(2)/2],
  [-1, 1],
  [-1, -1]
];


module.exports = Ray;
