;(function() {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function ($el) {
    this.board = new Game.Board();
    this.$el = $el;
    this.setUpGrid();
    this.bindKeys();
    this.setInt();
  };

  View.prototype.setUpGrid = function () {
    for (var i = 0; i < 30; i++) {
      this.$el.append("<ul class='row'></ul>");
    }
    for (var j = 0; j < 40; j++) {
      $(".row").append("<li class='block'></li>");
    }
  };

  View.prototype.setInt = function () {
    setInterval(function() {
      this.render();
      this.board.snake.move();
    }.bind(this), 150);
  };

  View.prototype.bindKeys = function () {
    $(document).on("keydown", function(event) {
      switch(event.which) {
        case 37: // left
          event.preventDefault();
          this.board.snake.turn("W");
        break;

        case 38: // up
          event.preventDefault();
          this.board.snake.turn("N");
        break;

        case 39: // right
          event.preventDefault();
          this.board.snake.turn("E");
        break;

        case 40: // down
          event.preventDefault();
          this.board.snake.turn("S");
        break;

        default: return;
      }
    }.bind(this));
  };

  View.prototype.render = function () {
    this.$li = this.$el.find("li");
    this.$li.filter(".snake").removeClass();
    this.$li.filter(".apple").removeClass();

    this.board.snake.body.forEach(function (coord) {
      var flatCoord = (coord.x * this.board.maxX) + coord.y;
      this.$li.eq(flatCoord).addClass("snake");
    }.bind(this));

    var appleCoords = this.board.apple.pos;
    var appleFlatCoords = (appleCoords.x * this.board.maxX) + appleCoords.y;
    this.$li.eq(appleFlatCoords).addClass("apple");
  };
})();
