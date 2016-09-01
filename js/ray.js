const Coord = require('./coord');

class Ray {
  constructor(origin, direction, map, age, maxLength, fading){
    this.body = [origin];  //origin is coord object
    this.head = origin;
    this.tail = origin;
    this.map = map;

    this.direction = direction; //direction is coord object
    this.speed = Ray.VELOCITY;

    this.age = (age) ? age : Math.random(20);
    this.maxLength = Ray.MAX_LENGTH + Math.random(20); //(maxLength) ? maxLength :
    this.fading = (fading) ? fading : false;
  }

  move(){
    // if (this.age < (Ray.LIFESPAN - 60)) {
      if (this.handleCollisions() === false){
        this.growHead();
      }
    // }

    if (this.age > Ray.LIFESPAN*0.50){
      this.fading = true;
    }

    if (this.body.length > Ray.MAX_LENGTH) {
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
        this.age + 20,        // advance new ray age to parent ray current age
        this.body.length, // set new ray max length
        this.fading
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

    if (this.age > Ray.LIFESPAN * 0.5) {
      headColor = this.colors.FADING_HEAD_COLOR;
    }

    if (this.age > Ray.LIFESPAN * 0.9) {
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
Ray.LIFESPAN = 100;
Ray.THICKNESS = 1;
Ray.MAX_LENGTH = 10;


Ray.unitVectors = (rayCount) => {

  if (rayCount==undefined) {
    rayCount = 360;
  }
  const rads = [];

  let rad = Math.random()*2 * Math.PI / rayCount;
  while (rad < Math.PI*2) {
    // console.log(rad)
    rads.push(rad);
    rad += 2 * Math.PI / rayCount;
  }
  console.log(rads)

  return rads.map(rad => [
    Math.cos(rad),
    Math.sin(rad)
  ]);
}

module.exports = Ray;
