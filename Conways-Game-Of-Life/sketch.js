let cells = [];
const width = 1000;
const height = 750;
let resetBtn;
let generations = 0;

function setup() {

    createCanvas(width, height);
    frameRate(20);

    resetBtn = createButton('Restart');
    resetBtn.position(width / 2, 0);
    resetBtn.mousePressed(handleReset);


    cells = initialCells();
};

function draw() {
    background(0);
    
    // render each cell
    cells.forEach(cell => cell.draw()); 

    // rules
    // 1. Any live cell with two or three live neighbors survives.
    // 2. Any dead cell with three live neighbors becomes a live cell.
    // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    const newGeneration = cells.map((thisCell, i) => {

        // not very efficient...oof
        const leftNeighbor = cells.find(thatCell => thatCell.y === thisCell.y && thatCell.x === (thisCell.x - thisCell.size));
        const rightNeighbor = cells.find(thatCell => thatCell.y === thisCell.y && thatCell.x === (thisCell.x + thisCell.size));
        const topNeighbor = cells.find(thatCell => thatCell.y === (thisCell.y - thisCell.size) && thatCell.x === thisCell.x);  
        const bottomNeighbor = cells.find(thatCell => thatCell.y === (thisCell.y + thisCell.size) && thatCell.x === thisCell.x);

        const topLeftNeighbor = cells.find(thatCell => thatCell.y === (thisCell.y - thisCell.size) && thatCell.x === (thisCell.x - thisCell.size));
        const topRightNeighbor = cells.find(thatCell => thatCell.y === (thisCell.y - thisCell.size) && thatCell.x === (thisCell.x + thisCell.size));
        const bottomLeftNeighbor = cells.find(thatCell => thatCell.y === (thisCell.y + thisCell.size) && thatCell.x === (thisCell.x - thisCell.size));  
        const bottomRightNeighbor = cells.find(thatCell => thatCell.y === (thisCell.y + thisCell.size) && thatCell.x === (thisCell.x + thisCell.size));
        
        // count # of alive neighbors
        const aliveNeighbors = [
            leftNeighbor, rightNeighbor, topNeighbor, bottomNeighbor,
            topLeftNeighbor, topRightNeighbor, bottomLeftNeighbor, bottomRightNeighbor
        ].reduce((acc, curr) => acc + (curr && curr.alive ? 1 : 0), 0);

        // determine if cell lives, or dies
        if(thisCell.alive) {
            thisCell.alive = (aliveNeighbors === 2 || aliveNeighbors === 3);
        } else {
            thisCell.alive = aliveNeighbors === 3;
        }

        return thisCell;
    });

    // update cells with new generation
    cells = newGeneration;
};

// reset button clicked
const handleReset = () => {
    cells = initialCells();
}

const initialCells = () => {
    const newCells = [];
    const cellSize = 25;

    // establish position for each cell and determine if they are
    // alive or dead to start
    for(let i = 0; i < width; i += cellSize) {
        for(let j = 0; j < height; j += cellSize) {
            const n = Math.random() * 1000;
            const cellAlive = n < 175 && (i > width / 4) && (i <  3 * width / 4) &&
            (j > width / 4) && (j <  3 * width / 4);

            newCells.push(new Cell(i, j, cellSize, cellAlive));
        }
    }

    return newCells;
}


class Cell {

    constructor(x, y, size, alive) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.alive = alive;
    };

    draw() {

        if(this.alive) fill(0, 255, 0);
        else fill(0);

        rect(this.x, this.y, this.size, this.size);
    };
};