const Coord = require('./coord');
const Ray = require('./ray');
const Util = require('./util');
const Wall = require('./wall');
const Player = require('./player');
const Monster = require('./monster');
const GameConstants = require('./game_constants');

class Map {
  constructor(canvas, level){
    this.rays = [];
    this.level = GameConstants.LEVELS[5];  //change back to level variable
    this.walls = this.level["walls"]
                  .map(row => {
                    return row.map((scalar, index) => {
                      if (index % 2 === 0) {
                        return scalar * canvas.width;
                      } else {
                        return scalar * canvas.height;
                      }
                    });
                  })
                  .map(info => new Wall(...info));
    window.player = this.player = new Player(
      this.level.playerStart.x * canvas.width,
      this.level.playerStart.y * canvas.height,
      this
    );

    this.monsters = [];
    if (this.level.monsters) {
      this.monsters = this.level.monsters.map( monsterStart => {
        return new Monster(
          monsterStart.x * canvas.width,
          monsterStart.y * canvas.height,
          this,
          monsterStart.active
        );
      });
    }
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

  inBounds(coord){
    return !(
      (coord.x < 0) || (coord.y < 0)
      || (coord.x > canvas.width) || (coord.y > canvas.height)
    );
  }

  cullRays(){
    this.rays = this.rays.filter(ray => {
      return (
        (ray.age < Ray.LIFESPAN) &&
        (ray.body.length > 0)
      );
    });

  }

  moveRays(){
    for (let ray of this.rays) {
      ray.move();
    }
  }

  moveMonsters(){
    for (let monster of this.monsters) {
      monster.move();
    }
  }

  playerKilled(){
    return this.monsters.some(monster => {
      if (!monster.active) { return; }
      return monster.pos.equals(this.player.pos);
    });
  }

  step(){
    this.cullRays();
    this.moveRays();
    this.moveMonsters();
  }

  draw(ctx){
    this.player.draw(ctx);
    this.rays.forEach(ray => ray.draw(ctx));
    this.walls.forEach(wall => wall.draw(ctx)); //remove this on release
  }
};


module.exports = Map;
