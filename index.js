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
const game = new Game();

const snake1 = new Snake({
    color: 'red',
    accent: 'gold',
    name: 'COLUMBUS',
    author: 'Alex',
});

const snake2 = new Snake({
    color: 'blue',
    accent: 'limegreen',
    name: 'VANCOUVER',
    author: 'Alex',
});

game.loadSnakes(snake1, snake2);

var lastTime = (new Date()).getTime();
var update = function () {
  var time = (new Date()).getTime();
  var diff = time - lastTime;
  game.update(diff);
  lastTime = time;
  setTimeout(update, 16);
};

var draw = function (time) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(canvas, context);
  window.requestAnimationFrame(draw);
};

resizeCanvas();
update();
requestAnimationFrame(draw);