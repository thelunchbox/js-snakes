var canvasContainer = document.getElementById('game-canvas-container');
var canvas = document.getElementById('game-canvas');
const snakeSelect1 = document.getElementById('snake1');
const snakeSelect2 = document.getElementById('snake2');
const gameClockInput = document.getElementById('game-clock');
const competitionMode = document.getElementById('competition-mode');
const snake1Select = document.getElementById("snake1");
const snake2Select = document.getElementById("snake2");

const canvasSettings = {
  width: 1600,
  height: 900,
};
canvas.width = canvasSettings.width;
canvas.height = canvasSettings.height;

var showCanvas = function() {
  canvas.style.display = 'block';
};
var hideStartScreen = function() {
  document.getElementById('choose-your-snake').style.display = 'none';
};

var resizeCanvas = function() {
  var normalRatio = canvasSettings.width / canvasSettings.height;
  var newRatio = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
  var scale = 1;
  if (newRatio < normalRatio) {
    // tall and skinny
    scale = canvasContainer.offsetWidth / canvasSettings.width;
  } else {
    // short and fat
    scale = canvasContainer.offsetHeight / canvasSettings.height;
  }
  canvas.style.transform = `scale(${scale},${scale})`;
};

window.addEventListener('resize', event => {
  resizeCanvas();
});

const competition = new Competition([
  new MySnake(),
  new AlwaysDownSnake(),
  new SpiralOut(),
  new AlwaysDownSnake(),
], 3000);

let game;

var lastTime = (new Date()).getTime();
var updateTimer;
var update = function() {
  var time = (new Date()).getTime();
  var diff = time - lastTime;

  if (competitionMode.value === "true") {
    competition.update(diff);
  } else {
    game.update(diff);
  }

  lastTime = time;
  if (updateTimer) {
    clearTimeout(updateTimer);
  }
  updateTimer = setTimeout(update, 16);
};

var justDraw = function() {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (competitionMode.value === "true") {
    competition.draw(canvas, context);
  } else {
    game.draw(canvas, context);
  }
};

var draw = function(time) {
  justDraw();
  window.requestAnimationFrame(draw);
};

var saveGameSettings = function(settings) {
  localStorage.setItem("snake1Class", settings.snake1Class);
  localStorage.setItem("snake2Class", settings.snake2Class);
  localStorage.setItem("gameClockValue", settings.gameClockValue);
  localStorage.setItem("competitionModeValue", settings.competitionModeValue);
};

var loadGameSettings = function() {
  const snake1Class = localStorage.getItem("snake1Class");
  const snake2Class = localStorage.getItem("snake2Class");
  const gameClockValue = localStorage.getItem("gameClockValue");
  const competitionModeValue = localStorage.getItem("competitionModeValue");
  if (snake1Class) {
    snake1Select.value = snake1Class;
  }
  if (snake2Class) {
    snake2Select.value = snake2Class;
  }
  if (gameClockValue) {
    gameClockInput.value = gameClockValue;
  }
  if (competitionModeValue) {
    competitionMode.value = competitionModeValue;
  }
};

var updateGameSettings = function() {
  const snake1Class = snake1Select.value;
  const snake2Class = snake2Select.value;
  const gameClockValue = gameClockInput.value;
  const competitionModeValue = competitionMode.value;

  saveGameSettings({ snake1Class, snake2Class, gameClockValue, competitionModeValue });

  const snake1 = new(snakeClasses.find(thisClass => thisClass.name === snake1Class))();
  const snake2 = new(snakeClasses.find(thisClass => thisClass.name === snake2Class))();

  game = new Test(
    snake1,
    snake2,
    gameClockValue * 1000, // 60000, // 60 seconds * 1000 ms / second
  );
  update();
  justDraw();
};

var setup = function() {
  updateGameSettings();
  resizeCanvas();
  showCanvas();
};
var start = function() {
  setup();
  requestAnimationFrame(draw);
};

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

snakeSelect1.onchange = updateGameSettings;
snakeSelect2.onchange = updateGameSettings;
gameClockInput.onchange = updateGameSettings;
competitionMode.onchange = updateGameSettings;

loadGameSettings();
setup();