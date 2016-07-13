class Coord {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  equals(otherCoord){
    return (this.x === otherCoord.x)
      && (this.y === otherCoord.y)
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
