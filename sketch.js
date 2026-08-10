// ============================================================
// JOSIE DE LA CRUZ PARK
// Interactive Landscape Section
// ============================================================


// ------------------------------------------------------------
// IMAGES
// ------------------------------------------------------------
let movingThings = [];

let mainSection;

let runningMan;
let biker;

let tree1;
let tree2;
let tree3;

let bird1;
let bird2;
let flock;

let water;


// ------------------------------------------------------------
// SCREEN STATE
// ------------------------------------------------------------

let currentScreen = "main";


// ------------------------------------------------------------
// ANIMATION
// ------------------------------------------------------------

let t = 0;


// ------------------------------------------------------------
// PRELOAD
// ------------------------------------------------------------

function preload() {

    mainSection = loadImage(
        "assets/main-section.png"
    );

    runningMan = loadImage(
        "assets/runningman.png"
    );

    biker = loadImage(
        "assets/biker.png"
    );

    tree1 = loadImage(
        "assets/tree1.png"
    );

    tree2 = loadImage(
        "assets/tree2.png"
    );

    tree3 = loadImage(
        "assets/tree3.png"
    );

    bird1 = loadImage(
        "assets/bird1.png"
    );

    bird2 = loadImage(
        "assets/bird2.png"
    );

    flock = loadImage(
        "assets/flock.png"
    );

    water = loadImage(
        "assets/water.png"
    );

}


// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------

function setup() {
    pixelDensity(1);

    let canvas = createCanvas(1800, 600);

    canvas.parent("canvas-container");

    imageMode(CORNER);
}

// ------------------------------------------------------------
// DRAW
// ------------------------------------------------------------

function draw() {
    background(242, 240, 233);

    drawMainSection();
    // Draw swaying trees
    drawSwayingTree(tree1, 360, 238, 90, 0);
    drawSwayingTree(tree2, 733, 193, 130, 1.5);
    drawSwayingTree(tree3, 1595, 225, 100, 3);
}


// ============================================================
// MAIN SECTION
// ============================================================

function drawMainSection() {
    image(mainSection, 0, 0, 1800, 600);
}


// ============================================================
// IMAGE FITTING
// ============================================================

function drawLayer(img) {

    let scale = getSectionScale();

    let drawWidth =
        img.width * scale;

    let drawHeight =
        img.height * scale;

    let x =
        (width - drawWidth) / 2;

    let y =
        (height - drawHeight) / 2;

    image(
        img,
        x,
        y,
        drawWidth,
        drawHeight
    );

}


// ------------------------------------------------------------
// SCALE
// ------------------------------------------------------------

function getSectionScale() {

    let scaleX =
        width / mainSection.width;

    let scaleY =
        height / mainSection.height;

    // Keep entire section visible

    return min(scaleX, scaleY);

}


// ============================================================
// TREE ANIMATION
// ============================================================

function drawSwayingTree(tree, x, y, size, offset) {
    let sway =
        sin(frameCount * 0.02 + offset) * 1.5 +
        sin(frameCount * 0.037 + offset * 2) * 0.5;
    push();
    
    let aspect = tree.width / tree.height;
    let h = size;
    let w = h * aspect;

    translate(x + w / 2, y + h);

    rotate(radians(sway));

    imageMode(CENTER);
    image(tree, 0, -h / 2, w, h);

    pop();

    imageMode(CORNER);
}


// ============================================================
// HOTSPOTS
// ============================================================

function drawHotspot(
    x,
    y,
    size,
    label
) {

    push();

    // Very subtle circle

    noFill();

    stroke(
        255,
        255,
        255,
        100
    );

    strokeWeight(2);

    circle(
        x,
        y,
        size
    );


    fill(255);

    noStroke();

    textAlign(
        CENTER,
        CENTER
    );

    textSize(13);

    text(
        label,
        x,
        y
    );

    pop();

}


// ============================================================
// DETAIL SCREENS
// ============================================================

function drawCreekDetail() {

    background(
        242,
        240,
        233
    );


    fill(30);

    textAlign(
        CENTER,
        CENTER
    );

    textSize(28);

    text(
        "SAUSAL CREEK",
        width / 2,
        height / 2
    );


    drawBackButton();

}


function drawArtDetail() {

    background(
        242,
        240,
        233
    );


    fill(30);

    textAlign(
        CENTER,
        CENTER
    );

    textSize(28);

    text(
        "COMMUNITY ART",
        width / 2,
        height / 2
    );


    drawBackButton();

}


// ============================================================
// BACK BUTTON
// ============================================================

function drawBackButton() {

    push();

    fill(
        255,
        240
    );

    stroke(40);

    rect(
        30,
        30,
        100,
        40,
        5
    );


    fill(30);

    noStroke();

    textAlign(
        CENTER,
        CENTER
    );

    textSize(14);

    text(
        "← BACK",
        80,
        50
    );

    pop();

}


// ============================================================
// INPUT
// ============================================================

function mousePressed() {

    handleInteraction(
        mouseX,
        mouseY
    );

}


function touchStarted() {

    handleInteraction(
        mouseX,
        mouseY
    );

    return false;

}


// ------------------------------------------------------------
// INTERACTION
// ------------------------------------------------------------

function handleInteraction(x, y) {

    if (currentScreen === "main") {

        // Creek

        if (
            dist(
                x,
                y,
                width * 0.10,
                height * 0.68
            ) < 50
        ) {

            currentScreen = "creek";

        }


        // Art wall

        else if (
            dist(
                x,
                y,
                width * 0.55,
                height * 0.55
            ) < 50
        ) {

            currentScreen = "art";

        }

    }

    else {

        // Back button

        if (
            x > 30 &&
            x < 130 &&
            y > 30 &&
            y < 70
        ) {

            currentScreen = "main";

        }

    }

}


// ============================================================
// RESPONSIVE CANVAS
// ============================================================

function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );

}

// ============================================================
// MOVING PEOPLE / BIRDS
// ============================================================

class MovingThing {

    constructor(img, type, index) {

        this.img = img;
        this.type = type;

        this.index = index;

        this.direction = random([-1, 1]);

        this.speed = this.getSpeed();

        this.x = 0;

        this.y = this.getLane();

        this.waiting = true;

        this.nextSpawn =
            millis() + random(1000, 7000);

    }


    // --------------------------------------------------------
    // SPEED
    // --------------------------------------------------------

    getSpeed() {

        if (this.type === "person") {

            return random(0.4, 0.8);

        }

        if (this.type === "bird") {

            return random(0.8, 1.5);

        }

        if (this.type === "flock") {

            return random(0.5, 1.0);

        }

    }


    // --------------------------------------------------------
    // Y POSITION
    // --------------------------------------------------------

    getLane() {

        if (this.type === "person") {

            // Temporary.
            // We'll tune these after seeing your section.

            return height * random(
                0.45,
                0.70
            );

        }

        if (this.type === "bird" ||
            this.type === "flock") {

            return height * random(
                0.20,
                0.40
            );

        }

    }


    // --------------------------------------------------------
    // SPAWN
    // --------------------------------------------------------

    spawn() {

        this.direction =
            random([-1, 1]);

        this.speed =
            this.getSpeed();

        this.y =
            this.getLane();


        if (this.direction === 1) {

            // Enter from left

            this.x =
                -this.image.width * 0.3;

        }

        else {

            // Enter from right

            this.x =
                width +
                this.image.width * 0.3;

        }


        this.waiting = false;

    }


    // --------------------------------------------------------
    // UPDATE
    // --------------------------------------------------------

    update() {

        // Waiting to spawn

        if (this.waiting) {

            if (millis() >= this.nextSpawn) {

                this.spawn();

            }

            return;

        }


        // Move

        this.x +=
            this.speed *
            this.direction;


        // Has left screen?

        let margin =
            this.image.width * 0.5;


        if (
            this.direction === 1 &&
            this.x > width + margin
        ) {

            this.wait();

        }


        if (
            this.direction === -1 &&
            this.x < -margin
        ) {

            this.wait();

        }

    }


    // --------------------------------------------------------
    // WAIT
    // --------------------------------------------------------

    wait() {

        this.waiting = true;

        // Random pause before coming back

        this.nextSpawn =
            millis() +
            random(
                2000,
                10000
            );

    }


    // --------------------------------------------------------
    // DISPLAY
    // --------------------------------------------------------

    display() {

        if (this.waiting) {
            return;
        }


        push();

        imageMode(CENTER);


        // Flip image when moving left

        if (this.direction === -1) {

            translate(
                this.x,
                this.y
            );

            scale(
                -1,
                1
            );

            image(
                this.image,
                0,
                0
            );

        }

        else {

            image(
                this.image,
                this.x,
                this.y
            );

        }


        pop();

    }

}