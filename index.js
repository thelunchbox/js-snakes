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

const competition = new Competition([
  new mySnake(),
  new mySnake(),
  new mySnake(),
  new mySnake(),
], 60000 );

const test = new Test(
  new mySnake(),
  new mySnake(),
  10000, // 60000, // 60 seconds * 1000 ms / second
);

var lastTime = (new Date()).getTime();
var update = function () {
  var time = (new Date()).getTime();
  var diff = time - lastTime;

  // competition.update(diff);
  test.update(diff);

  lastTime = time;
  setTimeout(update, 32);
};

var draw = function (time) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  // competition.draw(canvas, context);
  test.draw(canvas, context);

  window.requestAnimationFrame(draw);
};

resizeCanvas();
update();
requestAnimationFrame(draw);
