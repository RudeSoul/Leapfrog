const drawPolygon = (ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
}
const drawImage = (ctx, src, x, y, width, height, shadowColor) => {
    let img = new Image();
    img.src = src;

    ctx.drawImage(img, x, y, width, height);
}

const getEnterCurvature = (currentSegment, goal, length) => {
    let percent = goal / length;
    return currentSegment * percent + percent;
}

const getExitCurvature = (curvature, currentSegment, length) => {
    let percent = currentSegment / length;
    curvature -= percent;
    return curvature - percent;
}

const createSoundObject = location => {
    let sound = new Audio();
    let src = document.createElement("source");
    src.type = "audio/mpeg";
    src.src = location;
    sound.appendChild(src);
    return sound;
}


const generateRandomNO = (max = 1, min = 0) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}
