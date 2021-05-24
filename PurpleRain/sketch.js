const canvasWidth = 1050, canvasHeight = 750;
const rainDrops = [];
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // instantiate rain drops
    for(let i = 0; i < 1500; i++) {
        rainDrops.push(new Drop());
    }
};

function draw() {
    background(242, 224, 255);

    // render raindrops
    rainDrops.forEach(drop => drop.draw());
}


class Drop {
    length = 15;
    velocity = 2;
    maxZ = 200;
    minStroke = 2;

    constructor() {
        this.initiatePos(false);
    }

    draw() {
        stroke(140, 36, 214);
        const weight = 5 * (this.z / this.maxZ);
        strokeWeight(weight < this.minStroke ? this.minStroke : weight);
        line(this.x, this.y, this.x, this.y + this.length);
        
        // update position after render
        this.y += this.velocity;

        if(this.y > canvasHeight + this.length) {
            this.initiatePos(true);
        }
    }

    initiatePos(hidden) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight * 2;
        if(hidden) this.y = -this.y;

        this.z = Math.round(Math.random() * this.maxZ);
        this.length = 30 * (this.z / this.maxZ) ;
        this.velocity = 20 * (this.z / this.maxZ);

        if(this.velocity < 10) this.velocity = 10;
        if(this.length < 15) this.length = 15;
    }
}