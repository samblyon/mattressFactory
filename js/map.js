const Coord = require('./coord');
const Ray = require('./ray');
const Util = require('./util');

class Map {
  constructor(canvas){
    const pegCoord = new Coord(3, 3);
    const dirCoord = new Coord(1, 2);
    const testRay = new Ray(pegCoord, dirCoord, this);
    window.rays = this.rays = [ testRay ];
    this.walls = [];
    this.canvas = canvas;
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
    // draw rays
  }
};

module.exports = Map;
