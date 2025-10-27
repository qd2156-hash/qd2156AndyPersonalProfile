//////////////////////////////////////////////////
// Modified version of bg1/sketch.js for index.html background

let palette = ["#2c695a", "#4ad6af", "#7facc6", "#4e93cc", "#f6684f", "#ffd300"]

function setup () {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.id('mainCanvas');
    angleMode(DEGREES);
    background("#fffceb");

    // Scale brushes to adapt to canvas size
    brush.scaleBrushes(1.5);

    // Activate the flowfield we're going to use
    brush.field("seabed");
}

function draw() {
    frameRate(10);
    translate(-width/2, -height/2);

    // brush.box() returns an array with available brushes
    let available_brushes = brush.box();

    // Set the stroke to a random brush, color, and weight = 1
    brush.set(random(available_brushes), random(palette), 1);

    // Draw a random flowLine (x, y, length, direction)
    brush.flowLine(random(width), random(height), random(300,800), random(0,360));

    // Set the stroke to a random brush, color, and weight = 1
    brush.set(random(available_brushes), random(palette), 1);

    // Draw a random flowLine (x, y, length, direction)
    brush.flowLine(random(width), random(height), random(300,800), random(0,360));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
