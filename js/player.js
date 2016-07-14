const Coord = require('./coord');
const Ray = require('./ray');

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
