// ============================================================
// JOSIE DE LA CRUZ PARK
// Interactive Landscape Section
// ============================================================


// ------------------------------------------------------------
// IMAGES
// ------------------------------------------------------------

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


// ============================================================
// MAIN SECTION
// ============================================================

function drawMainSection() {

    // --------------------------------------------------------
    // 1. STATIC BASE
    // --------------------------------------------------------

    drawLayer(mainSection);


    // --------------------------------------------------------
    // 2. WATER
    // --------------------------------------------------------

    drawLayer(water);


    // --------------------------------------------------------
    // 3. TREES
    // --------------------------------------------------------

    drawTree(tree1, 4000.0);
    drawTree(tree2, 0.8);
    drawTree(tree3, 1.6);


    // --------------------------------------------------------
    // 4. PEOPLE
    // --------------------------------------------------------

    drawMovingPerson(runningMan, 0.0);
    drawMovingPerson(biker, 2.0);


    // --------------------------------------------------------
    // 5. BIRDS
    // --------------------------------------------------------

    drawBird(bird1, 0.0);
    drawBird(bird2, 2.5);
    drawFlock();


    // --------------------------------------------------------
    // 6. INTERACTIVE AREAS
    // --------------------------------------------------------

    drawHotspot(
        width * 0.10,
        height * 0.68,
        100,
        "CREEK"
    );

    drawHotspot(
        width * 0.55,
        height * 0.55,
        100,
        "ART WALL"
    );

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

function drawTree(img, phase) {

    let scale = getSectionScale();

    let drawWidth =
        img.width * scale;

    let drawHeight =
        img.height * scale;

    let x =
        (width - drawWidth) / 2;

    let y =
        (height - drawHeight) / 2;


    // --------------------------------------------------------
    // IMPORTANT:
    //
    // These coordinates are TEMPORARY.
    // We'll replace them with the actual tree locations
    // after testing your image.
    // --------------------------------------------------------

    let treeX = width * 0.50;
    let treeY = height * 0.45;


    // Gentle movement

    let sway =
        sin(t * 1.2 + phase) * 1.5;


    push();

    // Move to tree location

    translate(
        treeX,
        treeY
    );

    // Very subtle rotation

    rotate(
        radians(sway)
    );

    translate(
        -treeX,
        -treeY
    );


    image(
        img,
        x,
        y,
        drawWidth,
        drawHeight
    );

    pop();

}


// ============================================================
// PEOPLE
// ============================================================

function drawMovingPerson(img, phase) {

    let scale = getSectionScale();

    let drawWidth =
        img.width * scale;

    let drawHeight =
        img.height * scale;

    let baseX =
        (width - drawWidth) / 2;

    let baseY =
        (height - drawHeight) / 2;


    // Temporary movement

    let movement =
        sin(t * 0.5 + phase) * 20;


    image(
        img,
        baseX + movement,
        baseY,
        drawWidth,
        drawHeight
    );

}


// ============================================================
// BIRDS
// ============================================================

function drawBird(img, phase) {

    let scale = getSectionScale();

    let drawWidth =
        img.width * scale;

    let drawHeight =
        img.height * scale;

    let baseX =
        (width - drawWidth) / 2;

    let baseY =
        (height - drawHeight) / 2;


    let movement =
        sin(t * 0.3 + phase) * 80;


    image(
        img,
        baseX + movement,
        baseY,
        drawWidth,
        drawHeight
    );

}


// ------------------------------------------------------------
// FLOCK
// ------------------------------------------------------------

function drawFlock() {

    let scale = getSectionScale();

    let drawWidth =
        flock.width * scale;

    let drawHeight =
        flock.height * scale;

    let baseX =
        (width - drawWidth) / 2;

    let baseY =
        (height - drawHeight) / 2;


    let movement =
        sin(t * 0.2) * 100;


    image(
        flock,
        baseX + movement,
        baseY,
        drawWidth,
        drawHeight
    );

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