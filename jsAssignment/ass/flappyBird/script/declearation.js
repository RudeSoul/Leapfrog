var GAME_ANIMATION_SPEED_FPS = 60;
var CONTAINER_WIDTH = 288;
var CONTAINER_HEIGHT = 512;
var MOVING_SPACE = CONTAINER_HEIGHT - 112
var GAME_SPEED = 1;

var AccelerationY = 0;
var GRAVITY = 0.3;
var BIRD_SPEED_LIMIT = 3;

var BIRD_HEIGHT = 24;
var BIRD_WIDTH = 34;
var BIRD_DEFAULT_X_POSITION = 50;
var BIRD_DEFAULT_Y_POSITION = CONTAINER_HEIGHT / 2 / 2;

var dieAudio = new Audio('./assets/audio/die.wav');
var pointAudio = new Audio('./assets/audio/point.wav');
var swooshAudio = new Audio('./assets/audio/swoosh.wav');
var wingAudio = new Audio('./assets/audio/wing.wav');

var OBSTACLE_BETWEEN_SPACE = 2 * BIRD_HEIGHT;

var PIPE_WIDTH = 52;
var PIPE_HEIGHT = 320;

var OBSTACLES = [
    './assets/images/pipe-green.png',
    './assets/images/pipe-red.png',
];
