var canvas = document.getElementById('game-canvas');
canvas.width = 1600;
canvas.height = 900;
var canvasContainer = document.getElementById('game-canvas-container');

var showCanvas = function () {
  canvas.style.display = 'block';
};
var hideStartScreen = function () {
  document.getElementById('choose-your-snake').style.display = 'none';
};

var resizeCanvas = function () {
  var normalRatio = canvas.width / canvas.height;
  var newRatio = window.innerWidth / canvasContainer.offsetHeight;
  var scale = 1;
  if (newRatio < normalRatio) {
    // tall and skinny
    scale = window.innerWidth / canvas.width;
  } else if (newRatio >= normalRatio) {
    // short and fat
    scale = window.innerHeight / canvasContainer.offsetHeight;
  }
  canvas.style.transform = 'translate(-50%, -50%) scale(' + scale + ', ' + scale + ')';
};

window.addEventListener('resize', event => {
  resizeCanvas();
});

const competition = new Competition([
  new MySnake(),
  new AlwaysDownSnake(),
  new SpiralOut(),
  new AlwaysDownSnake(),
], 60000 );

let game;

var lastTime = (new Date()).getTime();
var updateTimer;
var update = function () {
  var time = (new Date()).getTime();
  var diff = time - lastTime;

  // competition.update(diff);
  game.update(diff);

  lastTime = time;
  if(updateTimer) {
    clearTimeout(updateTimer);
  }
  updateTimer = setTimeout(update, 100);
};

var justDraw = function () {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  // competition.draw(canvas, context);
  game.draw(canvas, context);
};

var draw = function (time) {
  justDraw();
  window.requestAnimationFrame(draw);
};

var updateSnakeChoices = function () {
  const snake1Class = document.getElementById("snake1").value;
  const snake2Class = document.getElementById("snake2").value;
  const snake1 = eval(`new ${snake1Class}()`);
  const snake2 = eval(`new ${snake2Class}()`);
  game = new Test(
    snake1,
    snake2,
    10000, // 60000, // 60 seconds * 1000 ms / second
  );
  update();
  justDraw();
};

var setup = function () {
  updateSnakeChoices();
  resizeCanvas();
  showCanvas();
};
var start = function () {
  setup();
  requestAnimationFrame(draw);
};

const snakeSelect1 = document.getElementById('snake1');
const snakeSelect2 = document.getElementById('snake2');
snakeClasses.forEach(snakeClass => {
  const snakeObj = new snakeClass();
  const snakeName = snakeObj.name;
  const snakeClassName = snakeClass.name;

  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.textContent = option2.textContent = snakeName;
  option1.value = snakeClassName;
  option2.value = snakeClassName;
  snakeSelect1.appendChild(option1);
  snakeSelect2.appendChild(option2);
});

snakeSelect1.onchange = updateSnakeChoices;
snakeSelect2.onchange = updateSnakeChoices;

setup();