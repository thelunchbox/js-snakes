var canvas = document.createElement('canvas');
canvas.width = 1600;
canvas.height = 900;
document.body.appendChild(canvas);

var resizeCanvas = function () {
  var normalRatio = canvas.width / canvas.height;
  var newRatio = window.innerWidth / window.innerHeight;
  var scale = 1;
  if (newRatio < normalRatio) {
    // tall and skinny
    scale = window.innerWidth / canvas.width;
  } else if (newRatio >= normalRatio) {
    // short and fat
    scale = window.innerHeight / canvas.height;
  }
  canvas.style.transform = 'translate(-50%, -50%) scale(' + scale + ', ' + scale + ')';
}

window.addEventListener('resize', event => {
  resizeCanvas();
});

// const Game = require('./script/game');
const game = new Game({
  time: 60000, // time per round
});

const snake1 = new Snake({
  color: '#d00',
  accent: '#db0',
  name: 'REDGOLD',
  author: 'Alex',
});

const snake2 = new Snake({
  color: '#00f',
  accent: '#0d0',
  name: 'BLUEGREEN',
  author: 'Alex',
});

let snakes = [
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
];

const rounds = Math.ceil(Math.log(snakes.length) / Math.log(2));
const target = Math.pow(2, rounds);
const tournament = new Tournament(rounds, {
  x: canvas.width / 2,
  y: 80,
  width: canvas.width / 2,
  height: canvas.height - 80
});

while (snakes.length < target) {
  snakes.push(new mySnake());
}
snakes = snakes.sort(() => Math.random() - 0.5);

tournament.rounds[0] = snakes.map(snake => ({
  name: snake.name,
  color: snake.color,
  accent: snake.accent,
}));

let winners = [];
let pause = true;
let round = 1;
let gameId = 0;

const loadNextSnakes = () => {
  gameId++;
  if (snakes.length == 0 && winners.length > 1) {
    snakes = [...winners];
    winners = [];
    round++;
    gameId = 0;
  }
  if (snakes.length > 1) {
    const s1 = snakes.shift();
    const s2 = snakes.shift();
    game.loadSnakes(s1, s2);
    pause = false;
  }
};

game.gameOver = (score) => {
  pause = true;
  if (score.p1 > score.p2) {
    winners.push(game.p1);
  } else {
    winners.push(game.p2);
  }
  const { name, color, accent } = winners.slice(-1)[0];
  tournament.addWinner({
    name,
    color,
    accent,
  }, round);

  setTimeout(() => {
    loadNextSnakes();
  }, 3000);
};

loadNextSnakes();

var lastTime = (new Date()).getTime();
var update = function () {
  var time = (new Date()).getTime();
  var diff = time - lastTime;
  if (!pause) game.update(diff);
  lastTime = time;
  setTimeout(update, 32);
};

var draw = function (time) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(canvas, context);
  tournament.draw(canvas, context, round, gameId);
  window.requestAnimationFrame(draw);
};

resizeCanvas();
update();
requestAnimationFrame(draw);
