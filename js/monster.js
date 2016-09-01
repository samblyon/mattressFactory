const Coord = require('./coord');
const Ray = require('./ray');

class Monster {
  constructor(startX, startY, map, active){
    this.pos = new Coord(startX, startY);
    this.map = map;
    if (active) { this.activate(); }
  }

  emitRays(){
    const newRays = Ray.unitVectors(32).map(dir => {
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
