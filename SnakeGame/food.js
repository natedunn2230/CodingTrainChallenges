class Food {

    constructor() {
        this.x = random(10, width / 1.1);
        this.y = random(10, height / 1.1);
        this.size = 20;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.size, this.size);        
    }

    respawn() {
        this.x = random(10, width / 1.1);
        this.y = random(10, height / 1.1);
    }
}