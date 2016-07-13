const Ray = require('./ray');
const Util = require('./util');

class Map {
  constructor(canvas){
    const pegCoord = new Coord(3, 3);
    const dirCoord = new Coord(1, 2);
    const testRay = new Ray(pegCoord, dirCoord);
    this.rays = [ testRay ];
    this.walls = [];
    this.canvas = canvas;
  }

  cullRays(){
    this.rays = this.rays.filter(ray => {
      return ray.age < 10;
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
    // draw objects
    // draw rays
  }
};

module.exports = Map;
