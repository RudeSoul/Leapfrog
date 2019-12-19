const startDefaultGame = document.getElementById('defaultGame');
startDefaultGame.style.display = 'block';
mapSpace.style.display = 'block';


startDefaultGame.addEventListener('click', function () {
  racingTrack = DEFAULT_RACING_TRACK;
  NO_OF_ENEMIES = 36;
  startDefaultGame.style.display = 'none';
  roadValues.style.display = 'none';
  mapSpace.style.display = 'none';
  document.getElementById('main-canvas').width = ROAD_PARAM.CANVAS_WIDTH;
  document.getElementById('main-canvas').width = ROAD_PARAM.CANVAS_HEIGHT;
  TOTAL_LENGTH_OF_ROAD = (() => {
    let total = 0;
    for (let i = 0; i < racingTrack.length - 1; i++)
      total += racingTrack[i].number;

    return total + FINISH_LINE_LENGTH;
  })();



  const game = new Game();
  game.start();
})
