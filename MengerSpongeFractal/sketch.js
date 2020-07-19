let boxes = [];


class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.r = r;
  }

  show() {
    fill(255);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.r);
    pop();
  }
}

function setup() {
  createCanvas(800, 800, WEBGL);
  boxes.push(new Box(0, 0, 0, 375));
  boxes = mengerStep(0, boxes);

  // slider for iteration no.
  iterationSlider = createSlider(0, 3, 0, 1);
  iterationSlider.position(100, 100);
  iterationSlider.input(onSliderClick)
}

function draw() {
  background(0);
  lights();

  // rotate the menger sponge so that it is easily visible
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.001);

  // render each box
  boxes.forEach((box, i) => box.show());
}

function mengerStep(iterations, items) {
  if(iterations === 0)
    return items;
  
    let newCubes = [];

  // for each cube, we have to create 27 sub-cubes, and replace the original with them
  items.forEach((item, i) => {
    let step = item.r / 3;
    let offset = item.pos;

    // find 27 sub-cubes...
    for(let x = -step; x <= step; x+= step) {
      for(let y = -step; y <= step; y += step) {
        for(let z = -step; z <= step; z += step) {
          // the cases for the holes of each menger level
          if(x === 0 && y === 0 && z === 0) continue;
          if((y === step || y === -step) && x === 0 && z === 0) continue;
          if(y === 0 && (z === step || z === -step) && x === 0) continue;
          if(y === 0 && z === 0 &&(x === -step || x === step)) continue;

          newCubes.push(new Box(x + offset.x, y + offset.y, z + offset.z, item.r / 3));     
        }
      }
    }
  });

  return mengerStep(--iterations, newCubes);
}

function onSliderClick() {
  boxes = mengerStep(iterationSlider.value(), [new Box(0, 0, 0, 375)]);
}
