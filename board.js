;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  MAXX = 40;
  MAXY = 30;
  SNAKEPOS = new Game.Coord(Math.floor(MAXX/2), Math.floor(MAXY/2));

  var Board = Game.Board = function() {
    this.maxX = MAXX; // Use in view class for flatCoords calculation
    this.grid = this.newGrid();
    this.snake = new Game.Snake(this, SNAKEPOS);
    this.apple = new Game.Apple(this, this.randomPos());
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
      var x = tail.x;
      var y = tail.y;
      this.grid[x][y] = undefined;
    }

    for (var i = 0; i < this.snake.body.length; i++) {
      var snake_x = this.snake.body[i].x;
      var snake_y = this.snake.body[i].y;
      this.grid[snake_x][snake_y] = "S";
    }

    var apple_x = this.apple.pos.x;
    var apple_y = this.apple.pos.y;
    this.grid[apple_x][apple_y] = "A";
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


})();
