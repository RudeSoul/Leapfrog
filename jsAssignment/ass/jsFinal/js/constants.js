//Utils.js constants

//preLoader.js constants

//Dashboard.js constants
const STEERING_ROTATION = 50;

//Enemies.js constants
const ENEMY_ACCELERATION_FACTOR = 80;
const ENEMY_COLLISION_SPEED_DECREASE_FACTOR = 1.4;
let NO_OF_ENEMIES;
const ENEMY_IMAGES = [
  {
    carLeft: {
      x: 6, y: 23, w: 217, h: 101
    },
    carCentre: {
      x: 445, y: 23, w: 190, h: 98
    },
    carRight: {
      x: 858, y: 22, w: 217, h: 101
    }
  },
  {
    carLeft: {
      x: 6, y: 271, w: 217, h: 101
    },
    carCentre: {
      x: 445, y: 271, w: 190, h: 98
    },
    carRight: {
      x: 858, y: 271, w: 217, h: 101
    }
  },
  {
    carLeft: {
      x: 6, y: 519, w: 217, h: 101
    },
    carCentre: {
      x: 445, y: 519, w: 190, h: 98
    },
    carRight: {
      x: 858, y: 519, w: 217, h: 101
    }
  }
];

//Player.js constants
const MAX_SPEED = 950;
const OFF_ROAD_MAX_SPEED = 220;
const ACCELERATION = 7.5;
const BREAKING = -20;
const DECELERATION = -7;

const TURNING_SPEED = 0.05;
const CENTRIFUGAL_FORCE = 0.0007;
const PLAYER_WIDTH = 200;
const PLAYER_HEIGHT = 150;


const CURVE_POSITION_UPDATE_THRESHOLD = 50;
const PLAYER_Z_WIDTH = 700;
const PLAYER_WIDTH_MULTIPLIER = 4;
const ENEMY_WIDTH_MULTIPLIER = 13;
const ENEMY_Z_WIDTH = 1200;
const CAR_TO_BASE_SEGMENT_OFFSET = 4;
const ROAD_CENTRE_TO_LEFT_TREE_DISTANCE = -1.25;
const ROAD_CENTRE_TO_RIGHT_TREE_DISTANCE = 1.55;

//road.js constants
const ROAD_PARAM = {
  WIDTH: 8000,
  SEGMENT_LENGTH: 400,  // length of a single segment
  SIDE_STRIP_LENGTH: 5,  // number of segments sideStrip strip
  NO_OF_LANES: 2,
  CAMERA_HEIGHT: 4000,       // z height of camera
  CAMERA_DEPTH: 0.15,           // z distance camera is from the screen 
  NO_OF_SEG_TO_DRAW: 100,      //number of seg we draw at a time
  CANVAS_WIDTH: 1000,
  CANVAS_HEIGHT: 400,
  COLORS: [
    { road: '#696969', grass: '#9c1010', sideStrip: 'red', lane: 'white' },
    { road: '#696969', grass: '#9e2020', sideStrip: 'white' },
  ],
}
const TREE_SPARSITY_FACTOR = 5;
//this game was orginally designed in 1920/997 screen so for other screen resolutions,percentage is calculated
const WIDTH_MULTIPLIER = (ROAD_PARAM.CANVAS_WIDTH - 1920) / 1920;
const HEIGHT_MULTIPLIER = (ROAD_PARAM.CANVAS_HEIGHT - 997) / 997;

const TREES = [
  { img: 'images/tree.png', width: 64 * WIDTH_MULTIPLIER + 64, height: 154 * HEIGHT_MULTIPLIER + 154 },
  { img: 'images/tree2.png', width: 62 * WIDTH_MULTIPLIER + 62, height: 95 * HEIGHT_MULTIPLIER + 95 },
];

const GAME_IMAGES = [
  'images/tree.png',
  'images/tree2.png',
  'images/spedoMeterTrans.png',
  'images/steering_wheel-.png',
  'images/spritesheet.high.png',
  'images/b.png',
  'images/finish2.png',
  'images/enemies.png',
];

//creatMap.js constants
const DEFAULT_RACING_TRACK = [
  { number: 100, curvature: 100 },
  { number: 200, curvature: -100 },
  { number: 300, curvature: 0 },
  { number: 400, curvature: -100 },
  { number: 500, curvature: 100 },
  { number: 600, curvature: 0 },
  { number: 700, curvature: 100 },
  { number: 800, curvature: -100 },
];
const dropDownBtn = document.getElementById("dropDownBtn");
const roadValues = document.getElementById("roadValues");
const leftCurvature = document.getElementById("leftCurvature");
const noOfEnemies = document.getElementById("noOfEnemies");
const roadLength = document.getElementById("roadLength");
const mapSpace = document.getElementById('mapSpace');
const WHITE_SPACE_ON_ROAD = 5;
const X_POSITION_FOR_DRAWING_MAP = 0;
let CURVATURE = 0;
let RACING_MAP = [];
let ROAD_DRAWING_FACTOR = 0;
let ROAD_CURVE_DRAWING_FACTOR = 0;

//gameMainBody.js constants
const FINISH_LINE_LENGTH = 100;
let TOTAL_LENGTH_OF_ROAD;
const CAR_CENTRE = {
  x: 0,
  y: 130,
  w: 69,
  h: 38
};

const CAR_LEFT = {
  x: 70,
  y: 130,
  w: 77,
  h: 38
};

const CAR_RIGHT = {
  x: 148,
  y: 130,
  w: 77,
  h: 38
};

const CAR_ACCELERATE = createSoundObject('sounds/caraccelerate.mp3');
const CAR_DECELERATE = createSoundObject('sounds/cargeardown.mp3');
const CAR_SKID = createSoundObject('sounds/carskid.mp3');
const CARSTARTED = createSoundObject('sounds/carstart.mp3');

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;
const BACKGROUND_MOVEMENT_FACTOR = 14;

const PLAYER_NAME = [
  'PRABESH',
  'PRAJWAL',
  'SWEKSHYA',
  'PRABIN',
  'JANISH',
  'NIRMAL',
  'NIRAJ',
  'SULAV',
  'VAXO',
];

//startGame.js constants

//defaultGame.js constants

