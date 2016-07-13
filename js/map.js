const Wave = require('./wave');

class Map {
  constructor(){
    this.waves = [ new Wave(3, 3) ];
  }

  blankMap(){
    return (
      [
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "X", "__", "__", "__", "X", "__", "__"],
        ["__", "__", "__", "__", "__", "__", "__", "__"]
      ]
    );
  }

  isWall(coord) {
    return (this.grid[coord.y][coord.x] === "X");
  }

  inBounds(coord) {
    return (coord.y >= 0) && (coord.y < this.grid.length)
        && (coord.x >= 0) && (coord.x < this.grid[0].length);
  }

  //simple text based render
  render(){
    const map = this.blankMap();

    return map.map( row => row.join("")).join("</br>");
  }
};

module.exports = Map;
