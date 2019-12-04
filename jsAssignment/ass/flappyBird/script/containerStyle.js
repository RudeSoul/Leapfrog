var containerBackground = document.getElementById('containerBackground');
containerBackground.style.height = CONTAINER_HEIGHT + 'px';
containerBackground.style.width = CONTAINER_WIDTH + 'px';


containerBackground.style.backgroundImage = 'url("./assets/sprites/background-day.png")';
containerBackground.style.margin = 'auto auto';
containerBackground.style.backgroundSize = '100% 100%';
containerBackground.style.backgroundRepeat = 'repeat-x';
containerBackground.style.position = 'relative';
containerBackground.style.overflow = 'hidden';

var containerRoad = document.getElementById('containerRoad');
containerRoad.style.position = 'absolute';
containerRoad.style.height = CONTAINER_HEIGHT + 'px';
containerRoad.style.width = CONTAINER_WIDTH + 'px';
containerRoad.style.backgroundImage = 'url(\'./assets/sprites/base.png\')';
containerRoad.style.backgroundSize = '100%';
containerRoad.style.backgroundRepeat = 'repeat-x';
containerRoad.style.backgroundPosition = 'bottom';
containerRoad.style.zIndex = 20;

var pauseRestartButton = document.getElementById('game-restart-play');
pauseRestartButton.style.height = CONTAINER_HEIGHT + 'px';
pauseRestartButton.style.width = CONTAINER_WIDTH + 'px';
pauseRestartButton.style.backgroundImage = 'url(\'./assets/sprites/message.png\')';
pauseRestartButton.style.backgroundSize = '100%';
pauseRestartButton.style.zIndex = 20;
