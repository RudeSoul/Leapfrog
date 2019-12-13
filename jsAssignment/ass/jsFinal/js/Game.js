const racingTrack = [
    { number: 100, curvature: -10 },
    { number: 300, curvature: 65 },
    { number: 300, curvature: 0 },
    { number: 300, curvature: 65 },
    { number: 300, curvature: -20 },
    { number: 300, curvature: 0 },
    { number: 300, curvature: -65 },
    { number: 300, curvature: 0 },
    { number: 300, curvature: 65 },
    { number: 500, curvature: 0 },
];

const FINISH_LINE_LENGTH = 140;

const TOTAL_LENGTH_OF_ROAD = (() => {
    let total = 0;
    for (let i = 0; i < racingTrack.length - 1; i++)
        total += racingTrack[i].number;

    return total + FINISH_LINE_LENGTH;
})();


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


const CAR_ACCELERATE = createSoundObject('sounds/accelerate.mp3');
const CAR_DECELERATE = createSoundObject('sounds/car+geardown.mp3');
const CAR_SKID = createSoundObject('sounds/skid.wav');
const CAR_START = createSoundObject('sounds/carstartgarage.mp3');

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

class Game {

    constructor() {
        this.canvas = document.getElementById("main-canvas");
        this.canvas.setAttribute('width', ROAD_PARAM.CANVAS_WIDTH);
        this.canvas.setAttribute('height', ROAD_PARAM.CANVAS_HEIGHT);

        this.ctx = this.canvas.getContext("2d");
        this.backgroundImageStart = -(ROAD_PARAM.CANVAS_WIDTH) * 2;

        this.position = 0;   //   Z position of the camera 

        this.road = new Road();

        //initialize the road object
        racingTrack.map(sector => {
            this.addRoad(sector.number / 2, sector.curvature);
        });

        
        this.player = new Player();
        this.dashBoard = new DashBoard();
        this.enemies = [];

        for (let x = 0; x < NO_OF_ENEMIES; x++)
            this.enemies.push(new Enemies((x + 1) / 2.5 * 500, x, (x + 1) / 2.5 * 10000, PLAYER_NAME[x] || ('PLAYER' + x)));


        this.carSprite = CAR_CENTRE;

        this.drawPlayer = this.drawPlayer.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.start = this.start.bind(this);

    }


    enterSector(length, curvature) {
        for (let n = 0; n < length; n++)
            this.road.initializeSegments(getEnterCurvature(n, curvature, length));
    }



    exitSector(length, curvature) {
        for (let n = 0; n < length; n++)
            this.road.initializeSegments(getExitCurvature(curvature, n, length));
    }


    addRoad(length, curvature) {
        this.enterSector(length, curvature);

        this.exitSector(length, curvature);
    }


    drawRoad() {
        this.road.drawRoad(this.ctx, this.position, this.player.playerX, this.enemies);
    }


    drawBackground() {
        drawImage(this.ctx, 'images/b.png', this.backgroundImageStart, 0, ROAD_PARAM.CANVAS_WIDTH * 5, 549 * HEIGHT_MULTIPLIER + 549);
    }


    drawPlayer() {
        this.player.draw(
            this.ctx,
            'images/spritesheet.high.png',
            this.carSprite,
            this.canvas.width / 2 + 30 * WIDTH_MULTIPLIER + 30,
            600 * HEIGHT_MULTIPLIER + 600,
            this.isSpacePressed
        );
    }


    playSounds() {
        if (this.isUpPressed) CAR_ACCELERATE.play();

        if (this.isDownPressed) {
            CAR_ACCELERATE.pause();
            CAR_DECELERATE.play();
        }

        if ((this.isLeftPressed || this.isRightPressed)
            && this.road.segments[this.road.findSegmentIndex(this.position)].curvature != 0)
            CAR_SKID.play();
    }

    drawDashBoard() {
        this.dashBoard.drawSteering(this.ctx, this.isLeftPressed, this.isRightPressed);
        this.dashBoard.drawSpeedometer(this.ctx);
        this.dashBoard.drawProgressBar(this.ctx);
    }
    
    drawRank() {
        this.dashBoard.drawRankInfo(this.ctx);
    }



    draw() {
        this.drawBackground();
        this.drawRoad();
        this.drawPlayer();
        this.drawDashBoard();
        this.drawRank();
    }



    gameLoop() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.playSounds();
        this.draw();

    }

    start() {
        //load all the images before the game starts
        let preLoader = new PreLoader();
        preLoader.load(() => {
            setInterval(this.gameLoop, 40);
            // CAR_START.play();
        });
    }
}

document.getElementById('main-canvas').width = ROAD_PARAM.CANVAS_WIDTH;
document.getElementById('main-canvas').width = ROAD_PARAM.CANVAS_HEIGHT;

const game = new Game();
game.start();