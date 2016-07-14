const Coord = require('./coord');

class Wall {
  constructor(topX, topY, bottomX, bottomY){
    this.topLeft = new Coord(topX, topY);
    this.bottomRight = new Coord(bottomX, bottomY);
    this.width = bottomX - topX;
    this.height = bottomY - topY;
  }

  draw(ctx){
    ctx.fillStyle = "#222";
    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
  }
}

module.exports = Wall;
