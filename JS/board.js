;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  MAXX = 40;
  MAXY = 30;
  SNAKEPOS = new Game.Coord(Math.floor(MAXX/2), Math.floor(MAXY/2));

  var Board = Game.Board = function(view) {
    this.maxX = MAXX; // Use in view class for flatCoords calculation
    this.grid = this.newGrid();
    this.snake = new Game.Snake(this, SNAKEPOS, view);
    this.generateApple();
    this.updateBoard(SNAKEPOS);
  };

  Board.prototype.newGrid = function () {
    var grid = new Array(MAXX);
    for (var row = 0; row < MAXX; row++) {
      grid[row] = new Array(MAXY);
    }

    return grid;
  };

  Board.prototype.updateBoard = function (tail) {
    if (tail) {
      this.grid[tail.x][tail.y] = undefined;
    }

    for (var i = 0; i < this.snake.body.length; i++) {
      if (this.grid[this.snake.body[i].x]) {
        this.grid[this.snake.body[i].x][this.snake.body[i].y] = "S";
      }
    }

    this.grid[this.apple.pos.x][this.apple.pos.y] = "A";
  };

  Board.prototype.randomPos = function () {
    var randPos = new Game.Coord(Math.floor(Math.random() * MAXY), Math.floor(Math.random() * MAXX));
    return randPos;
  };

  Board.prototype.generateApple = function() {
   var pos;
   var isApple = false;
   while (!isApple) {
     pos = this.randomPos();
     var x = pos.x;
     var y = pos.y;
     if (this.grid[x][y] !== "S") {
       isApple = true;
     }
   }
   var apple = new Game.Apple(this, pos);
   this.apple = apple;
  };

  Board.prototype.validPosition = function (coord) {
    return (coord.x >= 0) && (coord.y >= 0) && (coord.x < MAXY) && (coord.y < MAXX);
  };
})();
