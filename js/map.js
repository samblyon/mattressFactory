const Coord = require('./coord');
const Ray = require('./ray');
const Util = require('./util');
const Wall = require('./wall');
const Player = require('./player');
const Monster = require('./monster');

class Map {
  constructor(canvas, level){
    this.rays = [];
    this.level = Map.LEVELS[level];  //change back to level variable
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
      return ray.age < Ray.LIFESPAN;
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

//make relative sizes so can scale
Map.LEVELS = {
  1: {
    walls: [
              [0, 0, 0.01, 1],
              [0, 0.35, 0.75, 0.4],
              [0, 0.6, 0.6, 0.65],
              [0.7, 0.35, 0.75, 1],
              [0.55, 0.65, 0.6, 1]
            ],
    playerStart: {x: .05, y: .47}
  },
  2: {
    walls: [
            [0.35, 0, 0.5, 0.05],
            [0.35, 0, 0.4, 0.3],
            [0.5, 0, 0.55, 0.3],
            [0, .25, .35, .3],
            [.25, .3, .3, .35],
            [0, .35, .3, .4],
            [.15, .4, .2, .55],
            [.2, .5, .3, .55],
            [.25, .55, .3, .6],
            [.25, .6, .4, .65],
            [.35, .65, .4, .7],
            [.35, .4, .5, .5],
            [.4, .67, .6, .7],
            [.55, .25, .6, .3],
            [.6, .15, .8, .2],
            [.6, .2, .65, .4],
            [.5, .4, .65, .45],
            [.8, .15, .85, .4],
            [.7, .4, 1, .45],
            [.78, .45, .8, .5],
            [.63, .55, .95, .57],
            [.99, .45, 1, .5],
            [.6, .7, .61, 1],
            [.8, .65, .81, .9],
            [.61, .99, 1, 1],
            [.9, .57, .91, 1],
            [.91, .65, 1, .73]
    ],
    playerStart: {x: .45, y: .07}
  },
  3: {
    walls: [
              [0, 0, 0.01, 1],
              [0, 0.35, 0.75, 0.4],
              [0, 0.6, 0.6, 0.65],
              [0.7, 0.35, 0.75, 1],
              [0.55, 0.65, 0.6, 1]
            ],
    playerStart: {x: .1, y: .47},
    monsters: [
      {x: .06, y: .27, active: true},
      {x: .06, y: .87, active: true}
    ]
  },
  4: {
    walls: [
              [0, 0, 0.01, 1],
              [0, 0.35, 0.75, 0.4],
              [0, 0.6, 0.6, 0.65],
              [0.7, 0.35, 0.75, 1],
              [0.55, 0.65, 0.6, 1]
            ],
    playerStart: {x: .1, y: .47},
    monsters: [
      {x: .06, y: .45}
    ]
  },
  5: {
    walls: [
      [0, 0, 1, 0.01],
      [0, 0, 0.01, 1],
      [0, .99, 1, 1],
      [.95, 0, 1, .45],
      [.95, .55, 1, 1]
    ],
    playerStart: {x: .05, y: .5},
    monsters: [
      {x: .05, y: .05},
      {x: .05, y: .95}
    ]
  },
  6: {
    walls: [
      [0.35, 0, 0.5, 0.05],
      [0.35, 0, 0.4, 0.3],
      [0.5, 0, 0.55, 0.3],
      [0, .25, .35, .3],
      [.25, .3, .3, .35],
      [0, .35, .3, .4],
      [.15, .4, .2, .55],
      [.2, .5, .3, .55],
      [.25, .55, .3, .6],
      [.25, .6, .4, .65],
      [.35, .65, .4, .7],
      [.35, .4, .5, .5],
      [.4, .67, .6, .7],
      [.55, .25, .6, .3],
      [.6, .15, .8, .2],
      [.6, .2, .65, .4],
      [.5, .4, .65, .45],
      [.8, .15, .85, .4],
      [.7, .4, 1, .45],
      [.78, .45, .8, .5],
      [.63, .55, .95, .57],
      [.7, .72, .74, .74],
      [.99, .45, 1, .5],
      [.6, .7, .61, 1],
      [.8, .65, .81, .9],
      [.61, .99, 1, 1],
      [.9, .57, .91, 1],
      [.91, .65, 1, .73]
    ],
    playerStart: {x: .45, y: .07},
    monsters: [
        {x: .21, y: .45}
    ]
  },
}


module.exports = Map;
