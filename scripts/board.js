const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols');
const NUM_OF_ROWS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-rows');

export default class Board {
    constructor(rows = NUM_OF_ROWS, cols = NUM_OF_COLS) {
        this.rows = rows; // number of rows
        this.cols = cols; // number of columns
        this.spaces = []; // spaces array, used to check for winner
        this.drawBoard();
    }

    get board() {
        return document.querySelector("#board");
    }

    // creates HTML for the board and initializes the spaces array
    drawBoard() {
        this.board.className = "grid";
        for (let i = 0; i < this.rows; i++) {
            let temp = [];
            for (let j = 0; j < this.cols; j++) {
                this.board.insertAdjacentHTML('beforeend', `<div class="space" col="${j}"></div>`);
                temp.push(0);
            }
            this.spaces.push(temp);
        }
    }

    // resets the board by setting all entries in spaces[] to 0
    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.spaces[i][j] = 0;
            }
        }
        console.log(this.spaces);
    }

    // marks spaces[row][col] with playerID
    mark(row, col, playerID) {
        this.spaces[row][col] = playerID;
    }

    // returns true if spaces[row][col] contains playerID. false otherwise.
    check(row, col, value) {
        return this.spaces[row][col] === value;
    }
}

