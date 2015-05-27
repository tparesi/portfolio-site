;(function(){
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  DIR = {
    "N": new Game.Coord(-1, 0),
    "S": new Game.Coord(1, 0),
    "W": new Game.Coord(0, -1),
    "E": new Game.Coord(0, 1)
  };

  var Snake = Game.Snake = function(board, pos) {
    this.board = board;
    this.body = new Array();
    this.dir = DIR["E"];
    this.body.push(pos);
    this.body.push(pos.plus(this.dir));
    this.turning = false;
  };

  Snake.prototype.move = function () {
    this.turning = false;
    var tail;
    if (!this.appleCheck()) {
      tail = this.body.pop();
    }

    this.body.unshift(this.head().plus(this.dir));
    this.board.updateBoard(tail);
};

  Snake.prototype.turn = function (newDir) {
    if (!this.dir.isOpposite(DIR[newDir]) && !this.turning) {
      this.turning = true;
      this.dir = DIR[newDir];
    }
  };

  Snake.prototype.appleCheck = function () {
   var head = this.head();
   if (this.board.grid[head.x][head.y] === "A") {
     this.board.apple = "S";
     this.board.generateApple();
     return true;
   }
   return false;
 };

 Snake.prototype.selfCollide = function () {
   var collision = false
   var head = this.head();
   this.body.slice(1).forEach(function (segment) {
     if (head.equals(segment)) {
       collision = true;
     }
   }.bind(this));

   return collision;
 };

 Snake.prototype.head = function () {
   return this.body[0];
 };
})();
