class Coord {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  equals(otherCoord){
    return (Math.abs(Math.floor(this.x) - Math.floor(otherCoord.x)) < 3)
      && (Math.abs(Math.floor(this.y) - Math.floor(otherCoord.y)) < 3)
  }

  getAdjacentCoords(){
    return Coord.MOVES.map(move => {
      const newX = this.x + move[0];
      const newY = this.y + move[1];
      return new Coord(newX, newY);
    });
  }
}

Coord.MOVES = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];

module.exports = Coord;
