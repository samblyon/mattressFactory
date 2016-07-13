const Coord = require('./coord');

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
