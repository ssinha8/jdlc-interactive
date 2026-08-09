// ============================================================
// JOSIE DE LA CRUZ PARK — INTERACTIVE SECTION
// ============================================================


// ------------------------------------------------------------
// GLOBAL VARIABLES
// ------------------------------------------------------------

let mainSection;

// Current screen
// "main"   = full section
// "creek"  = creek detail
// "art"    = art wall detail

let currentScreen = "main";

// Animation timer
let t = 0;


// ------------------------------------------------------------
// PRELOAD
// ------------------------------------------------------------

function preload() {

    mainSection = loadImage(
        "assets/section/main-section.png"
    );

}


// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------

function setup() {

    let canvas = createCanvas(
        windowWidth,
        windowHeight
    );

    canvas.parent("canvas-container");

    imageMode(CORNER);

}


// ------------------------------------------------------------
// DRAW
// ------------------------------------------------------------

function draw() {

    background(242, 240, 233);

    t += 0.01;


    if (currentScreen === "main") {

        drawMainSection();

    }

    else if (currentScreen === "creek") {

        drawCreekDetail();

    }

    else if (currentScreen === "art") {

        drawArtDetail();

    }

}


// ------------------------------------------------------------
// MAIN SECTION
// ------------------------------------------------------------

function drawMainSection() {

    drawFittedImage(mainSection);

    // Temporary interaction zones
    // We'll replace these once I see your actual section.

    drawHotspot(
        width * 0.45,
        height * 0.55,
        120,
        "CREEK"
    );

    drawHotspot(
        width * 0.72,
        height * 0.48,
        100,
        "ART WALL"
    );

}


// ------------------------------------------------------------
// CREEK DETAIL
// ------------------------------------------------------------

function drawCreekDetail() {

    background(242, 240, 233);

    // Temporary placeholder

    push();

    fill(30);
    textAlign(CENTER, CENTER);
    textSize(24);

    text(
        "SAUSAL CREEK",
        width / 2,
        height / 2
    );

    pop();


    drawBackButton();

}


// ------------------------------------------------------------
// ART DETAIL
// ------------------------------------------------------------

function drawArtDetail() {

    background(242, 240, 233);

    push();

    fill(30);
    textAlign(CENTER, CENTER);
    textSize(24);

    text(
        "COMMUNITY ART",
        width / 2,
        height / 2
    );

    pop();


    drawBackButton();

}


// ------------------------------------------------------------
// HOTSPOT
// ------------------------------------------------------------

function drawHotspot(x, y, size, label) {

    push();

    noFill();

    stroke(255, 255, 255, 120);
    strokeWeight(2);

    circle(x, y, size);

    fill(255);
    noStroke();

    textAlign(CENTER, CENTER);
    textSize(14);

    text(label, x, y);

    pop();

}


// ------------------------------------------------------------
// BACK BUTTON
// ------------------------------------------------------------

function drawBackButton() {

    push();

    fill(255, 240);

    stroke(40);
    strokeWeight(1);

    rect(
        30,
        30,
        100,
        40,
        5
    );

    fill(30);
    noStroke();

    textAlign(CENTER, CENTER);
    textSize(14);

    text(
        "← BACK",
        80,
        50
    );

    pop();

}


// ------------------------------------------------------------
// MOUSE / TOUCH INTERACTION
// ------------------------------------------------------------

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
// INTERACTION LOGIC
// ------------------------------------------------------------

function handleInteraction(x, y) {

    if (currentScreen === "main") {

        // Creek hotspot
        if (
            dist(
                x,
                y,
                width * 0.45,
                height * 0.55
            ) < 60
        ) {

            currentScreen = "creek";

        }


        // Art wall hotspot
        else if (
            dist(
                x,
                y,
                width * 0.72,
                height * 0.48
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


// ------------------------------------------------------------
// RESPONSIVE CANVAS
// ------------------------------------------------------------

function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );

}


// ------------------------------------------------------------
// IMAGE FITTING
// ------------------------------------------------------------

function drawFittedImage(img) {

    let imageRatio =
        img.width / img.height;

    let screenRatio =
        width / height;


    let drawWidth;
    let drawHeight;


    if (imageRatio > screenRatio) {

        // Image is wider than screen

        drawHeight = height;

        drawWidth =
            height * imageRatio;

    }

    else {

        // Image is taller than screen

        drawWidth = width;

        drawHeight =
            width / imageRatio;

    }


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