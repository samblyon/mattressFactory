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
    const newRays = Ray.unitVectors().map(dir => {
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
