class Test {

  constructor(snake1, snake2, time = 60000) {
    // const Game = require('./script/game');
    this.game = new Game({
      time, // time per round
    });

    this.game.loadSnakes(snake1, snake2);
  }

  update(diff) {
    this.game.update(diff);
  }

  draw(canvas, context) {
    this.game.draw(canvas, context);
  }
}
