const Coord = require('./coord');

class Wave {
  constructor(x, y){
    this.coord = new Coord(x, y);
    this.front = [ this.coord ];
    this.seen = [this.coord ];
    this.strength = 4;
  }

  spread(){
    //breadth-first explore
    const newFront = [];
    this.front.forEach(coord => {
      coord.getAdjacentCoords().forEach(adjCoord => {
        if (
          this.seen.some( intCord => {
            return intCoord.equals(adjCoord);
          });
        ) {
          return;
        } else {
          this.newFront.push(adjCoord);
          this.seen.push(adjCoord);
        }
      });
    });

    this.front = newFront;
  }
}; //sdsd

module.exports = Wave;
