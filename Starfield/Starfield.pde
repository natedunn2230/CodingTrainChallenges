Star[] stars = new Star[600];

void setup() {
  size(800, 800);
 
  // initialize the stars
  for(int i = 0; i < stars.length; i++) {
   stars[i] = new Star();
  }
};

void draw() {
  translate(width/2, height/2);
  background(0f, 0f, 0f);
 
  // render the stars and update position
  for(int i = 0; i < stars.length; i++) {
    stars[i].move(mouseX);
    stars[i].show();
  }
};
