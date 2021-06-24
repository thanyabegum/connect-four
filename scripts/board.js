export default class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.spaces = [];
        this.drawBoard();
        console.log(this.spaces);
    }

    get board() {
        return document.querySelector("#board");
    }

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

    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.spaces[i][j] = 0;
            }
        }
        console.log(this.spaces);
    }

    mark(row, col, playerID) {
        this.spaces[row][col] = playerID;
    }

    check(row, col, value) {
        return this.spaces[row][col] === value;
    }
}

