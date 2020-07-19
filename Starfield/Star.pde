class Star {
  
  float x, y, z, prevZ;
  boolean counterDirX, counterDirY;
  
  Star() {
    x = random(-width/2, width/2);
    y = random(-height/2, height/2);
    z = random(width);
    prevZ = z;
  }
  
  void show() {
    fill(255, 255, 255);
    float sx = map(x / z, 0, 1, 0, width);
    float sy = map(y / z, 0, 1, 0, height);
    float radius = map(z, 0, width, 10, 0);
    
    float prevX = map(x / prevZ, 0, 1, 0, width);
    float prevY = map(y / prevZ, 0, 1, 0, height);
    
    prevZ = z;
    ellipse(sx, sy, radius, radius);
    stroke(255, 255, 255);
    
    line(sx, sy, prevX, prevY);
    
  }
  
  void move(float mousePos) {
    float speed = map(mousePos, 0, width, 0, 50);
    z-= 0.25 + speed;
    if(z < 1) {
      x = random(-width/2, width/2);
      y = random(-height/2, height/2);
      z = random(width);
      prevZ = z;
    }
  }
}
