// ============================================================
// JOSIE DE LA CRUZ PARK
// Interactive Landscape Section
// ============================================================


// ------------------------------------------------------------
// IMAGES
// ------------------------------------------------------------
let mainSection;

let runningman;
let biker;
let people;

let tree1;
let tree2;
let tree3;

let bird1;
let bird2;
let flock;
let birds;

let water;
let waterData = {
    x: 147,
    y: 368,
    size: 38
};


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

    runningman = loadImage(
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
    windowResized();

    people = [
        /*
        {
            img: runningman,
            x: 1600,
            y: 288,
            size: 40,
            direction: -1,
            speed: 0.8,
            active: true,
            wait: 0,
            startX: 1400,
            endX: 500,
            baseY: 288,

            bridgeStart: 1200,
            bridgeEnd: 1000,
            bridgeHeight: 40,
        }, */

        {
            img: biker,
            x: 1800,
            y: 290,
            size: 30,
            direction: -1,
            speed: 1.2,
            active: true,
            wait: 0,
            startX: 1800,
            endX: 0,
            baseY: 290,

            bridgeStart: 380,
            bridgeEnd: 100,
            bridgeHeight: 10,

            rightSlopeStart: 1800,
            rightSlopeEnd: 900,
            rightSlopeHeight: 10,
        }
    ];
    birds = [
        {
            img: bird1,
            x: 100,
            y: 200,
            baseY: 200,
            size: 20,
            direction: 1,
            speed: 1.0,
            baseSpeed: 1.0,
            active: true,
            wait: 0,
            phase: random(TWO_PI)
        },

        {
            img: bird2,
            x: 1600,
            y: 250,
            baseY: 250,
            size: 20,
            direction: -1,
            speed: 0.9,
            baseSpeed: 0.9,
            active: true,
            wait: 0,
            phase: random(TWO_PI)
        },

        {
            img: flock,
            x: 500,
            y: 180,
            baseY: 180,
            size: 80,
            direction: 1,
            speed: 0.7,
            baseSpeed: 0.7,
            active: true,
            wait: 0,
            phase: random(TWO_PI)
        }
    ];
}

function windowResized() {
  const scale = Math.min(
    windowWidth / 1800,
    windowHeight / 600
  );

  const canvas = document.querySelector("canvas");

  canvas.style.width = `${1800 * scale}px`;
  canvas.style.height = `${600 * scale}px`;
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

    for (let bird of birds) {

        // Bird is waiting to return
        if (!bird.active) {

            bird.wait--;

            // Waiting period is over
            if (bird.wait <= 0) {

                bird.active = true;

                // Randomly choose a direction
                bird.direction = random() < 0.5 ? 1 : -1;

                // Randomize speed slightly
                bird.speed = bird.baseSpeed * random(0.8, 1.2);

                // Put bird outside the correct side
                if (bird.direction === 1) {
                    bird.x = -200;
                } else {
                    bird.x = 2000;
                }
            }

        } else {

            // Move bird
            let flightSpeed = bird.img === flock ? 0.018 : 0.025;
            let flightAmount = bird.img === flock ? 12 : 8;

            bird.x += bird.speed * bird.direction;
            bird.y = bird.baseY + sin(frameCount * flightSpeed + bird.phase) * flightAmount;

            // Bird leaves screen
            if (bird.direction === 1 && bird.x > 1800) {

                bird.active = false;

                // Random wait between 2–6 seconds
                bird.wait = random(120, 360);
            }

            if (bird.direction === -1 && bird.x < -200) {

                bird.active = false;

                // Random wait between 2–6 seconds or longer for flock
                let waitTime = bird.img === flock ? 2 : 1;

                bird.wait = random(120 * waitTime, 360 * waitTime);
            }
        }

        // Draw only if active
        if (bird.active) {
            drawBird(bird);
        }
    }

    for (let person of people) {

        if (!person.active) {

            person.wait--;

            if (person.wait <= 0) {

                person.active = true;

                // Randomly choose walking direction
                person.direction = random() < 0.5 ? 1 : -1;

                // Start at the appropriate end of the path
                if (person.direction === -1) {
                    person.x = person.startX;
                } else {
                    person.x = person.endX;
                }
            }

        } else {

            person.x += person.speed * person.direction;

           // Right-side gradual upslope
            if (
                person.x <= person.rightSlopeStart &&
                person.x >= person.rightSlopeEnd
            ) {

                let t =
                    (person.rightSlopeStart - person.x) /
                    (person.rightSlopeStart - person.rightSlopeEnd);

                person.y =
                    person.baseY +
                    person.rightSlopeHeight * (1 - t);

            }

            // Bridge
            else if (
                person.x <= person.bridgeStart &&
                person.x >= person.bridgeEnd
            ) {

                let t =
                    (person.bridgeStart - person.x) /
                    (person.bridgeStart - person.bridgeEnd);

                let bridgeOffset =
                    4 * person.bridgeHeight * t * (1 - t);

                person.y =
                    person.baseY - bridgeOffset;

            }

            // Normal flat section
            else {

                person.y = person.baseY;

            }

            if (
                (person.direction === -1 && person.x <= person.endX) ||
                (person.direction === 1 && person.x >= person.startX)
            ) {

                person.active = false;
                person.wait = random(180, 480);
            }

            drawPerson(person);
        }
    }
    drawWater();
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

function drawBird(bird) {

    let width = bird.size * (bird.img.width / bird.img.height);

    push();

    translate(bird.x, bird.y);

    imageMode(CENTER);

    if (bird.direction === -1) {
        scale(-1, 1);
    }

    image(
        bird.img,
        0,
        0,
        width,
        bird.size
    );

    pop();

    imageMode(CORNER);
}

function drawPerson(person) {

    let width =
        person.size *
        (person.img.width / person.img.height);

    push();

    // Move to center of person
    translate(
        person.x + width / 2,
        person.y + person.size / 2
    );

    // Flip when moving right
    if (person.direction === 1) {
        scale(-1, 1);
    }

    imageMode(CENTER);

    image(
        person.img,
        0,
        0,
        width,
        person.size
    );

    pop();

    imageMode(CORNER);
}

function drawWater() {
    let width =
        waterData.size *
        (water.width / water.height);

    image(
        water,
        waterData.x,
        waterData.y,
        width,
        waterData.size
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