class Snake {
    constructor(velocity) {
        this.size = 20;
        this.head = {x: width / 2, y: height / 2, xVel: 0, yVel: velocity}
        this.parts = [this.head]
        this.movements = [];
    }

    show() {
        fill(0, 60, 255);
        stroke(255);
        this.parts.forEach((part, i) => {
            if(i === 0) fill(200, 0, 65);
            rect(part.x, part.y, this.size, this.size);
        });
    }

    update() {

        this.parts.forEach((part, i) => {
            this.movements.forEach(m => {
                if(m.xVel !== 0 && abs(part.y - m.posY) < 1) {
                    part.xVel = m.xVel;
                    part.yVel = 0;
                    if(i === this.parts.length - 1) this.movements.splice(this.movements.indexOf(m), 1);
                } else if(m.yVel !== 0 && abs(part.x - m.posX) < 1) {
                    part.yVel = m.yVel;
                    part.xVel = 0;
                    if(i === this.parts.length - 1) this.movements.splice(this.movements.indexOf(m), 1);
                }
            })

            part.x += part.xVel;
            part.y += part.yVel;
            console.log(part);
            
        });
    }

    addMovement(x, y) {
        this.movements.push({xVel: x, yVel: y, posX: this.head.x, posY: this.head.y});
    }

    eatFood(food) {
        return (food.x + food.size > this.head.x && this.head.x + this.size > food.x) &&
        (food.y + food.size > this.head.y && this.head.y + this.size > food.y);ss
    }

    grow() {
        let lastPart = this.parts[this.parts.length - 1];
        console.log('last part', lastPart);
        this.parts.push({x: lastPart.x - Math.abs(lastPart.xVel), y: lastPart.y - Math.abs(lastPart.yVel), xVel: lastPart.xVel, yVel: lastPart.yVel});
    }
}