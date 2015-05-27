;(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Coord = Game.Coord = function(x,y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function (otherCoord) {
    return new Coord(this.x + otherCoord.x, this.y + otherCoord.y);
  };

  Coord.prototype.equals = function (otherCoord) {
    return this.x === otherCoord.x && this.y === otherCoord.y;
  };

  Coord.prototype.isOpposite = function (otherCoord) {
    return -this.x === otherCoord.x && -this.y === otherCoord.y;
  };
})();
