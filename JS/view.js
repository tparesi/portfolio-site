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
    this.paused = false;
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
    this.intervalId = setInterval(function() {
      this.endGameCheck();
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

        case 80:
          event.preventDefault();
          this.pause();
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

  View.prototype.endGameCheck = function () {
    if (!this.board.validPosition(this.board.snake.head()) || this.board.snake.selfCollide()) {
      clearInterval(this.intervalId);
      alert("you lost");
    } else {
      this.render();
      this.board.snake.move();
    }
  };

  View.prototype.pause = function () {
    if (this.paused) {
      this.$el.find(".pause-modal").css("display", "none");
      this.setInt();
      this.paused = false;
    } else {
      clearInterval(this.intervalId);
      this.$el.find(".pause-modal").css("display", "block");
      this.paused = true;
    }
  };
})();
