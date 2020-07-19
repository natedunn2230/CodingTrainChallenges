class Star {
  constructor() {
    this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.z = random(width);
    this.prevZ = this.z;
  }

  show() {
    fill(255);
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let radius = map(this.z, 0, width, 10, 0);

    let prevX = map(this.x / this.prevZ, 0, 1, 0, width);
    let prevY = map(this.y / this.prevZ, 0, 1, 0, height);

    this.prevZ = this.z;
    ellipse(sx, sy, radius, radius);
    stroke(255);

    line(sx, sy, prevX, prevY);
  }

  move(mousePos) {
    let speed = map(constrain(mousePos, 0, width), 0, width, 0, 25);
    this.z-= 0.25 + speed;
    if(this.z < 1) {
      this.x = random(-width/2, width/2);
      this.y = random(-height/2, height/2);
      this.z = random(width);
      this.prevZ = this.z;
    }
  }
}

let stars = [];

function setup() {
  for(let i = 0; i < 500; i++) {
    stars.push(new Star());
  }

  createCanvas(800, 800);
}

function draw() {
  translate(width/2, height/2);
  background(0);
  stars.forEach(star  => {
    star.move(mouseX);
    star.show();
  });
}
