class DeliveryVehicle {

    constructor(x, y) {

        // Vehicle position
        this.x = x;
        this.y = y;

        // Vehicle size
        this.width = 40;
        this.height = 30;

        // Movement physics
        this.velocityX = 0;
        this.velocityY = 0;

        this.acceleration = 0.2;
        this.maxSpeed = 4;
        this.drag = 0.92;

        // Battery system
        this.batteryLevel = 100;
        this.batteryDrainRate = 0.02;
    }


    update(keys) {

   // Calculate movement direction
let directionX = 0;
let directionY = 0;

if (keys.ArrowLeft) {
    directionX -= 1;
}

if (keys.ArrowRight) {
    directionX += 1;
}

if (keys.ArrowUp) {
    directionY -= 1;
}

if (keys.ArrowDown) {
    directionY += 1;
}


// Calculate the movement angle
if (directionX !== 0 || directionY !== 0) {

    const movementAngle = Math.atan2(
        directionY,
        directionX
    );

    // Use trigonometry to calculate directional velocity
    this.velocityX += Math.cos(movementAngle) * this.acceleration;
    this.velocityY += Math.sin(movementAngle) * this.acceleration;
}


        // Limit the vehicle's maximum speed
        this.velocityX = Math.max(
            -this.maxSpeed,
            Math.min(this.velocityX, this.maxSpeed)
        );

        this.velocityY = Math.max(
            -this.maxSpeed,
            Math.min(this.velocityY, this.maxSpeed)
        );


        // Apply movement
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Keep the vehicle inside the Canvas
if (this.x < 0) {
    this.x = 0;
    this.velocityX = 0;
}

if (this.x + this.width > 1000) {
    this.x = 1000 - this.width;
    this.velocityX = 0;
}

if (this.y < 0) {
    this.y = 0;
    this.velocityY = 0;
}

if (this.y + this.height > 600) {
    this.y = 600 - this.height;
    this.velocityY = 0;
}


        // Apply drag
        this.velocityX *= this.drag;
        this.velocityY *= this.drag;


        // Battery decreases while moving
        if (
            Math.abs(this.velocityX) > 0 ||
            Math.abs(this.velocityY) > 0
        ) {
            this.batteryLevel -= this.batteryDrainRate;
        }


        // Prevent battery from going below zero
        if (this.batteryLevel < 0) {
            this.batteryLevel = 0;
        }
    }


    draw(context) {

        context.fillStyle = "#071a2b";

        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
