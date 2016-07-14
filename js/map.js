const Coord = require('./coord');
const Ray = require('./ray');
const Util = require('./util');
const Wall = require('./wall');

class Map {
  constructor(canvas){
    const pegCoord = new Coord(3, 3);
    const dirCoord = new Coord(1, 2);
    const testRay = new Ray(pegCoord, dirCoord, this);
    window.rays = this.rays = [ testRay ];
    // const testWall = new Wall(10, 10, 20, 100);
    const testWall2 = new Wall(50, 200, 200, 210);
    window.walls = this.walls = [ testWall2 ];
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
    this.rays.forEach(ray => ray.draw(ctx));
    this.walls.forEach(wall => wall.draw(ctx)); //remove this on release
  }
};

module.exports = Map;
