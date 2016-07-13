module.exports = {
  inherits(Child, Parent) {
    function Surrogate (){};
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
    Child.prototype.constructor = Child;
  },

  // inBounds(coord) {
  //   return (coord.y >= 0) && (coord.y < this.grid.length)
  //   && (coord.x >= 0) && (coord.x < this.grid[0].length);
  // }

  // isWall(coord) {
  //   return (this.grid[coord.y][coord.x] === "X");
  // }

}
