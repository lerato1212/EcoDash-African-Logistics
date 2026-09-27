const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const batteryBar = document.getElementById("batteryBar");
const batteryText = document.getElementById("batteryText");

const efficiencyDisplay =
    document.getElementById("efficiency");

const deliveryPoint = {
    x: 850,
    y: 280,
    width: 90,
    height: 45
};

const solarMicrogrid = {
    x: 80,
    y: 80,
    width: 140,
    height: 100
};

const obstacles = [

    new Pothole(500, 300, 70, 45),
    new Pothole(700, 180, 60, 40),
    new Pothole(300, 430, 80, 45),
    new River(100, 400, 180, 70),
    new LoadSheddingZone(760, 400, 150, 70)

];

const windForce = {
    x: 0.03,
    y: 0
};

function drawEnvironment() {

    // Main terrain
    context.fillStyle = "#d8c7a3";
    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Main delivery road
    context.fillStyle = "#71808c";
    context.fillRect(
        0,
        250,
        canvas.width,
        120
    );

    // Road markings
    context.strokeStyle = "#dfe5e8";
    context.lineWidth = 3;
    context.setLineDash([25, 20]);

    context.beginPath();

    context.moveTo(
        0,
        310
    );

    context.lineTo(
        canvas.width,
        310
    );

    context.stroke();

    context.setLineDash([]);

    // Roadside vegetation
    context.fillStyle = "#5d7658";

    context.fillRect(40, 180, 35, 45);
    context.fillRect(880, 150, 40, 55);
    context.fillRect(180, 420, 45, 35);
    context.fillRect(820, 440, 35, 40);

    // Small solar panels
    context.fillStyle = "#263c4b";

    context.fillRect(500, 90, 70, 35);
    context.fillRect(590, 90, 70, 35);

    context.strokeStyle = "#bfc7ce";
    context.lineWidth = 2;

    context.strokeRect(500, 90, 70, 35);
    context.strokeRect(590, 90, 70, 35);

    // Solar panel supports
    context.fillStyle = "#263c4b";

    context.fillRect(530, 125, 8, 30);
    context.fillRect(620, 125, 8, 30);

    // Small destination marker
context.fillStyle = "#ffffff";

context.fillRect(
    deliveryPoint.x,
    deliveryPoint.y,
    deliveryPoint.width,
    deliveryPoint.height
);

    context.fillStyle = "#071a2b";
    context.font = "12px Arial";

 context.fillText(
    "DELIVERY",
    deliveryPoint.x + 20,
    deliveryPoint.y + 27
); 
}


// Create the delivery vehicle
const deliveryVehicle = new DeliveryVehicle(
    canvas.width / 2,
    canvas.height / 2
);


// Store the keys currently being pressed
const keys = {};
let deliveryCompleted = false;

let gameRunning = false;
let gamePaused = false;

let missionScore = 0;
let distanceTravelled = 0;
let missionTime = 300;

let highScore = Number(
    localStorage.getItem("ecoDashHighScore")
) || 0;

let energyUsed = 0;

const scoreDisplay = document.getElementById("score");
const distanceDisplay = document.getElementById("distance");
const timerDisplay = document.getElementById("timer");
const gameStatus = document.getElementById("gameStatus");

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const restartButton = document.getElementById("restartButton");

startButton.addEventListener("click", () => {

    gameRunning = true;
    gamePaused = false;

    pauseButton.disabled = false;
    startButton.disabled = true;

    gameStatus.textContent =
        "Mission active. Deliver the essential supplies!";
});

pauseButton.addEventListener("click", () => {

    if (!gameRunning) {
        return;
    }

    gamePaused = !gamePaused;

    if (gamePaused) {

        pauseButton.textContent = "RESUME";

        gameStatus.textContent =
            "Mission paused.";

    } else {

        pauseButton.textContent = "PAUSE";

        gameStatus.textContent =
            "Mission resumed.";
    }
});

restartButton.addEventListener("click", () => {

    deliveryVehicle.x = canvas.width / 2;
    deliveryVehicle.y = canvas.height / 2;

    deliveryVehicle.velocityX = 0;
    deliveryVehicle.velocityY = 0;

    deliveryVehicle.batteryLevel = 100;

    missionScore = 0;
    distanceTravelled = 0;
    energyUsed = 0;
    missionTime = 300;

    gameRunning = false;
    gamePaused = false;
    deliveryCompleted = false;

    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = "PAUSE";

    gameStatus.textContent =
        "Ready for your delivery mission.";

    scoreDisplay.textContent = "0";
    distanceDisplay.textContent = "0 m";
    timerDisplay.textContent = "05:00";
});


// Detect when a keyboard key is pressed
window.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});


// Detect when a keyboard key is released
window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});


// Main game loop
function gameLoop() {

    // Clear the previous frame
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawEnvironment();


    // Update the vehicle
    deliveryVehicle.update(keys);
 if (gameRunning && !gamePaused) {

    const currentSpeed = Math.sqrt(
        deliveryVehicle.velocityX ** 2 +
        deliveryVehicle.velocityY ** 2
    );

    distanceTravelled += currentSpeed;

    missionScore = Math.floor(
        distanceTravelled * 0.1
    );
    energyUsed =
        100 - deliveryVehicle.batteryLevel;
}

    // Apply wind force
deliveryVehicle.velocityX += windForce.x;
deliveryVehicle.velocityY += windForce.y;

    // Check for collision with the pothole
obstacles.forEach((obstacle) => {

    const hasCollided =
        deliveryVehicle.x < obstacle.x + obstacle.width &&
        deliveryVehicle.x + deliveryVehicle.width > obstacle.x &&
        deliveryVehicle.y < obstacle.y + obstacle.height &&
        deliveryVehicle.y + deliveryVehicle.height > obstacle.y;


    if (hasCollided) {

        // Slow the vehicle down
        deliveryVehicle.velocityX *= 0.4;
        deliveryVehicle.velocityY *= 0.4;

        // Extra battery consumption
        deliveryVehicle.batteryLevel -= 0.05;

        if (deliveryVehicle.batteryLevel < 0) {
            deliveryVehicle.batteryLevel = 0;
        }
    }

});

const reachedDeliveryPoint =
    deliveryVehicle.x < deliveryPoint.x + deliveryPoint.width &&
    deliveryVehicle.x + deliveryVehicle.width > deliveryPoint.x &&
    deliveryVehicle.y < deliveryPoint.y + deliveryPoint.height &&
    deliveryVehicle.y + deliveryVehicle.height > deliveryPoint.y;

if (reachedDeliveryPoint && !deliveryCompleted) {

    deliveryCompleted = true;

    document.getElementById("gameStatus").textContent =
        "Delivery reached! Mission successful.";

    document.getElementById("deliverySound").play();
}

    // Check whether the vehicle is inside the Solar Microgrid Zone
const isInsideSolarMicrogrid =
    deliveryVehicle.x < solarMicrogrid.x + solarMicrogrid.width &&
    deliveryVehicle.x + deliveryVehicle.width > solarMicrogrid.x &&
    deliveryVehicle.y < solarMicrogrid.y + solarMicrogrid.height &&
    deliveryVehicle.y + deliveryVehicle.height > solarMicrogrid.y;

let isLoadSheddingActive = false;

obstacles.forEach((obstacle) => {

    if (obstacle.type === "load-shedding") {

        const vehicleInLoadSheddingZone =
            deliveryVehicle.x < obstacle.x + obstacle.width &&
            deliveryVehicle.x + deliveryVehicle.width > obstacle.x &&
            deliveryVehicle.y < obstacle.y + obstacle.height &&
            deliveryVehicle.y + deliveryVehicle.height > obstacle.y;

        if (vehicleInLoadSheddingZone) {
            isLoadSheddingActive = true;
        }
    }
});


if (isInsideSolarMicrogrid && !isLoadSheddingActive) {

    deliveryVehicle.batteryLevel += 0.15;

    if (deliveryVehicle.batteryLevel > 100) {
        deliveryVehicle.batteryLevel = 100;
    }
}


   // Draw Solar Microgrid Zone
context.fillStyle = "#d7dde2";
context.fillRect(
    solarMicrogrid.x,
    solarMicrogrid.y,
    solarMicrogrid.width,
    solarMicrogrid.height
);

context.fillStyle = "#071a2b";
context.font = "14px Arial";
context.fillText(
    "SOLAR MICROGRID",
    solarMicrogrid.x + 12,
    solarMicrogrid.y + 55
);
    
    // Draw the pothole
    obstacles.forEach((obstacle) => {
    obstacle.draw(context);
});
    // Draw the vehicle
    deliveryVehicle.draw(context);


    // Update the battery display
    batteryBar.style.width = `${deliveryVehicle.batteryLevel}%`;
    batteryText.textContent = `${Math.ceil(deliveryVehicle.batteryLevel)}%`;

scoreDisplay.textContent = missionScore;

distanceDisplay.textContent =
    `${Math.floor(distanceTravelled)} m`;

    if (gameRunning && !gamePaused && missionTime > 0) {

    missionTime -= 1 / 60;

    if (missionTime <= 0) {
        missionTime = 0;
        gameRunning = false;
        pauseButton.disabled = true;

        gameStatus.textContent =
            "Time's up! Mission over.";

        if (missionScore > highScore) {
            highScore = missionScore;

            localStorage.setItem(
                "ecoDashHighScore",
                highScore
            );
        }
    }

    const minutes = Math.floor(missionTime / 60);
    const seconds = Math.floor(missionTime % 60);

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

if (gameRunning && !gamePaused) {

    missionTime -= 1 / 60;

    if (missionTime <= 0) {

        missionTime = 0;
        gameRunning = false;
        gamePaused = false;

        pauseButton.disabled = true;
        startButton.disabled = false;

        gameStatus.textContent =
            "Game Over! Time ran out.";

        if (missionScore > highScore) {

            highScore = missionScore;

            localStorage.setItem(
                "ecoDashHighScore",
                highScore
            );
        }
    }
}

const minutes = Math.floor(missionTime / 60);
const seconds = Math.floor(missionTime % 60);

timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

const efficiencyScore =
    distanceTravelled > 0
        ? Math.floor(
            distanceTravelled / Math.max(energyUsed, 1)
        )
        : 0;

scoreDisplay.textContent = missionScore;

distanceDisplay.textContent =
    `${Math.floor(distanceTravelled)} m`;

efficiencyDisplay.textContent =
    efficiencyScore;

scoreDisplay.textContent = missionScore;

distanceDisplay.textContent =
    `${Math.floor(distanceTravelled)} m`;

    efficiencyDisplay.textContent =
    efficiencyScore;

    // Continue the animation
    requestAnimationFrame(gameLoop);
}


// Start the game
gameLoop();
