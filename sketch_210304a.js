// Based on:
// Worley Noise
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/004-worley-noise.html
// https://youtu.be/4066MndcyCk
// p5 port: https://editor.p5js.org/codingtrain/sketches/QsiCWVczZ

let points = [];

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  for (let i = 0; i < 100; i++) {
    points[i] = createVector(random(width), random(height), random(width));
  }
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let distances = [];
      for (let i = 0; i < points.length; i++) {
        let v = points[i];
        let z = frameCount % width;
        let d = dist(x, y, z, v.x, v.y, v.z);
        distances[i] = d;
      }
      let sorted = sort(distances);
      let r = map(sorted[0], 0, 150, 100, 0);
      let g = map(sorted[1], 0, 255, 150, 0);
      let b = map(sorted[2], 0, 200, 100, 255);
      let index = (x + y * width) * 4;
      pixels[index + 0] = b;
      pixels[index + 1] = r;
      pixels[index + 2] = g;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  //save("20210304.png");
  noLoop();
}