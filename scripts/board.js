const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols');
const NUM_OF_ROWS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-rows');

export default class Board {
    constructor(rows = NUM_OF_ROWS, cols = NUM_OF_COLS) {
        this.spaces = [];
        this.drawBoard(rows, cols);
        console.log(this.spaces);
    }

    get board() {
        return document.querySelector("#board");
    }

    drawBoard(rows, cols) {
        for (let i = 1; i <= rows; i++) {
            let temp = [];
            for (let j = 1; j <= cols; j++) {
                this.board.insertAdjacentHTML('beforeend', this.createSpaceHTML(i, j));
                temp.push(0);
            }
            this.spaces.push(temp);
        }    
        this.board.className = "grid fade-in";
    }

    createSpaceHTML(i, j) {
        return `<div id="${i}-${j}" class="space"></div>`
    }
}

