class Competition {

  constructor(snakes, time) {
    // const Game = require('./script/game');
    this.game = new Game({
      time, // time per round
    });

    const rounds = Math.ceil(Math.log(snakes.length) / Math.log(2));
    const target = Math.pow(2, rounds);
    this.tournament = new Tournament(rounds, {
      x: canvas.width / 2,
      y: 80,
      width: canvas.width / 2,
      height: canvas.height - 80
    });

    while (snakes.length < target) {
      snakes.push(new mySnake());
    }
    snakes = snakes.sort(() => Math.random() - 0.5);

    this.tournament.rounds[0] = snakes.map(snake => ({
      name: snake.name,
      color: snake.color,
      accent: snake.accent,
    }));

    let winners = [];
    this.pause = true;
    this.round = 1;
    this.gameId = 0;

    const loadNextSnakes = () => {
      this.gameId++;
      if (snakes.length == 0 && winners.length > 1) {
        snakes = [...winners];
        winners = [];
        this.round++;
        this.gameId = 0;
      }
      if (snakes.length > 1) {
        const s1 = snakes.shift();
        const s2 = snakes.shift();
        this.game.loadSnakes(s1, s2);
        this.pause = false;
      }
    };

    this.game.gameOver = (score) => {
      this.pause = true;
      if (score.p1 > score.p2) {
        winners.push(this.game.p1);
      } else {
        winners.push(this.game.p2);
      }
      const { name, color, accent } = winners.slice(-1)[0];
      this.tournament.addWinner({
        name,
        color,
        accent,
      }, this.round);

      setTimeout(() => {
        loadNextSnakes();
      }, 3000);
    };

    loadNextSnakes();
  }

  update(diff) {
    if (!this.pause) this.game.update(diff);
  }

  draw(canvas, context) {
    this.game.draw(canvas, context);
    this.tournament.draw(canvas, context, this.round, this.gameId);
  }
}
