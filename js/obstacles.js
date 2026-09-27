class Pothole {

    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    draw(context) {

        // Draw the pothole
        context.fillStyle = "#263c4b";

        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );


        // Add a smaller inner section
        context.fillStyle = "#071a2b";

        context.fillRect(
            this.x + 8,
            this.y + 6,
            this.width - 16,
            this.height - 12
        );
    }
}

class River {

    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    draw(context) {

        // Draw the river
        context.fillStyle = "#71808c";

        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );


        // Add water lines
        context.strokeStyle = "#d7dde2";
        context.lineWidth = 2;

        for (let waterLine = 15; waterLine < this.height; waterLine += 20) {

            context.beginPath();

            context.moveTo(
                this.x + 10,
                this.y + waterLine
            );

            context.lineTo(
                this.x + this.width - 10,
                this.y + waterLine
            );

            context.stroke();
        }
    }
}

class LoadSheddingZone {

    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = "load-shedding";
    }


    draw(context) {

        context.fillStyle = "#263c4b";

        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        context.fillStyle = "#ffffff";
        context.font = "12px Arial";

        context.fillText(
            "LOAD-SHEDDING",
            this.x + 10,
            this.y + 30
        );
    }
}