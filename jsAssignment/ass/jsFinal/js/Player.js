
const PLAYER_WIDTH = 200;
const PLAYER_HEIGHT = 150;

class Player {
    constructor() {
        this.speed = 0;
        this.playerX = 0;

    }

    draw(ctx, image, sprite, destX, destY, isSpacePressed) {
        let spriteSheet = new Image();
        spriteSheet.src = image;

        //this gives the nitro effect
        if (this.nitro > 0 && isSpacePressed) {
            ctx.shadowColor = '#41dcf4';
            ctx.shadowBlur = 100;
            ctx.shadowOffsetY = 60;
        }

        ctx.drawImage(
            spriteSheet,
            sprite.x,
            sprite.y,
            sprite.w,
            sprite.h,
            destX,
            destY,
            PLAYER_WIDTH * WIDTH_MULTIPLIER + PLAYER_WIDTH,
            PLAYER_HEIGHT * WIDTH_MULTIPLIER + PLAYER_HEIGHT
        );

        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
    }

}   