const Coord = require('./coord');
const Ray = require('./ray');
const Util = require('./util');
const Wall = require('./wall');
const Player = require('./player');

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
