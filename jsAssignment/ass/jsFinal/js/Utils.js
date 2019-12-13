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
const drawRect = (ctx, xPos, yPos, width, height, color, shadowBlur) => {
    ctx.beginPath();
    ctx.fillStyle = color;

    if (shadowBlur) {
        ctx.shadowColor = shadowBlur;
        ctx.shadowBlur = 20;
    }

    ctx.rect(xPos, yPos, width, height);
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}
const writeText = (ctx, x, y, text, font, color) => {
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 40;
    ctx.fillText(text, x, y);

    ctx.shadowBlur = 0;
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
