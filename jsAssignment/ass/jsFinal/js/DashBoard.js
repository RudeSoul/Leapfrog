class DashBoard {
    constructor() {
    }

    drawSteering(ctx, isRightPressed, isLeftPressed) {
        let degrees;

        if (isLeftPressed) degrees = STEERING_ROTATION;
        else if (isRightPressed) degrees = -STEERING_ROTATION;
        else degrees = 0;

        ctx.save();
        ctx.translate(ROAD_PARAM.CANVAS_WIDTH - (300 * HEIGHT_MULTIPLIER + 300), ROAD_PARAM.CANVAS_HEIGHT - (200 * HEIGHT_MULTIPLIER + 200));
        // // rotate the canvas to the specified degrees
        ctx.rotate(degrees * Math.PI / 180);

        drawImage(
            ctx,
            'images/steering_wheel-.png',
            -(100 * HEIGHT_MULTIPLIER + 100),
            -(100 * HEIGHT_MULTIPLIER + 100),
            200 * HEIGHT_MULTIPLIER + 200,
            200 * HEIGHT_MULTIPLIER + 200
        );

        ctx.restore();
    }

    drawSpeedometer(ctx) {

        drawImage(
            ctx,
            'images/spedoMeterTrans.png',
            (ROAD_PARAM.CANVAS_WIDTH / 2 - (600 * WIDTH_MULTIPLIER + 600)) - (210 * HEIGHT_MULTIPLIER + 210),
            ROAD_PARAM.CANVAS_HEIGHT - (440 * HEIGHT_MULTIPLIER + 440),
            420 * HEIGHT_MULTIPLIER + 420,
            420 * HEIGHT_MULTIPLIER + 420
        );

        this.drawSpeed(ctx);

    }
    drawSpeed(ctx) {
        writeText(
            ctx,
            ROAD_PARAM.CANVAS_WIDTH / 2 - (600 * WIDTH_MULTIPLIER + 600),
            ROAD_PARAM.CANVAS_HEIGHT - (257 * HEIGHT_MULTIPLIER + 257),
            'white'
        )
    }
    drawRankInfo(ctx) {
        writeText(
            ctx,
            ROAD_PARAM.CANVAS_WIDTH / 2 + 50 * HEIGHT_MULTIPLIER + 50,
            950 * HEIGHT_MULTIPLIER + 950,


            'white'
        );

        writeText(
            ctx,
            ROAD_PARAM.CANVAS_WIDTH / 2 - (170 * HEIGHT_MULTIPLIER + 170),
            820 * HEIGHT_MULTIPLIER + 820,

            'white'
        );

        writeText(
            ctx,
            ROAD_PARAM.CANVAS_WIDTH / 2 + 260 * HEIGHT_MULTIPLIER + 260,
            940 * HEIGHT_MULTIPLIER + 940,

            'white'
        );
    }

    drawProgressBar(ctx) {

        drawRect(
            ctx,
            700 * WIDTH_MULTIPLIER + 700,
            ROAD_PARAM.CANVAS_HEIGHT - (150 * HEIGHT_MULTIPLIER + 150),
            600 * WIDTH_MULTIPLIER + 600,
            50 * HEIGHT_MULTIPLIER + 50,
            'rgba(0, 0, 0, 0.6)'
        );

        drawImage(
            ctx,
            'images/finish2.png',
            1300 * WIDTH_MULTIPLIER + 1300,
            ROAD_PARAM.CANVAS_HEIGHT - (150 * HEIGHT_MULTIPLIER + 150),
            50 * WIDTH_MULTIPLIER + 50,
            50 * HEIGHT_MULTIPLIER + 50
        );


    }

}