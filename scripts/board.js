export default class Board {
    constructor(rows, cols) {
        this.spaces = [];
        this.drawBoard(rows, cols);
    }

    drawBoard(rows, cols) {
        const board = document.querySelector("#board");
        for (let i = 1; i <= rows; i++) {
            let temp = [];
            for (let j = 1; j <= cols; j++) {
                const space = document.createElement("div");
                space.classList = "space";
                space.id = `${i}-${j}`;
                board.appendChild(space);
                temp.push(0);
            }
            this.spaces.push(temp);
        }    
        board.className = "grid";
    }
}
