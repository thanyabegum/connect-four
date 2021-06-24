import Board from './board.js'
import Checker from './checker.js';

const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols');
const NUM_OF_ROWS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-rows');

export default class Game {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.board = new Board(NUM_OF_ROWS, NUM_OF_COLS);
        this.startGame();
        this.bindNewGameBtn();
        this.bindMouseOver();
        this.bindMouseClick();
        this.bindKeys();
    }

    startGame() {
        this.active = true;
        this.turn = this.players[0];
        this.currentChecker = new Checker(this.turn);
    }

    get newGameBtn() {
        return document.querySelector("#new-game");
    }

    bindNewGameBtn() {
        this.newGameBtn.addEventListener('click', () => {
            this.reset();
        });
    }

    get message() {
        return document.querySelector("#message");
    }

    get allCheckers() {
        return Array.from(document.getElementsByClassName("checker"));
    }

    reset() {
        this.message.style.display = "none";
        this.board.reset();
        this.allCheckers.forEach(checker => {
            checker.removeAttribute("id");
            checker.style.transitionDuration = "1.75s";
            checker.style.top = "100vh"
            checker.addEventListener("webkitTransitionEnd", () => {
                checker.remove();
            });
        });
        this.startGame();
    }

    bindMouseOver() {
        board.addEventListener('mouseover', (event) => {
            if (this.active && event.target.className === "space") {
                const newCol = parseInt(event.target.getAttribute("col"));
                const oldCol = parseInt(this.currentChecker.col);
                this.currentChecker.move(newCol - oldCol);
            }
        });
    }

    bindMouseClick() {
        board.addEventListener('click', (event) => {
            if (this.active && event.target.className === "space") {
                const col = parseInt(event.target.getAttribute("col"));
                this.markAndDrop(col);
            }
        });
    }

    markAndDrop(col) {
        for (let i = NUM_OF_ROWS - 1; i >= 0; i--) {
            if (this.board.check(i, col, 0)) {
                this.currentChecker.drop(i);
                this.board.mark(i, col, this.turn.id)
    
                if (this.checkForWinner(i, col)) this.gameOver();
                else {
                    this.switchTurn();
                    this.currentChecker = new Checker(this.turn, col);
                }
                break;
            }
        }
    }

    switchTurn() {
        if (this.turn === this.players[0]) this.turn = this.players[1];
        else this.turn = this.players[0];
    }

    checkForWinner(col, row) {
        const playerID = this.turn.id;
        let counter = 0; // number of same color checkers in the row so far
        let rowIndex; // row index to check
        let colIndex; // col index to check
    
        // checks for vertical win
        for (let i = 0; i < 7; i++) {
            rowIndex = row - 3 + i;
            if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
            if (this.board.check(rowIndex, col, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
    
        // checks for horizontal win
        counter = 0; // restart counter
        for (let i = 0; i < 7; i++) {
            colIndex = col - 3 + i;
            if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
            if (this.board.check(row, colIndex, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
        
        // checks for rising (/) diagonal win
        counter = 0; // restart counter
        for (let i = 0; i < 7; i++) {
            rowIndex = row + 3 - i;
            colIndex = col - 3 + i;
            if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1 || colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
            if (this.board.check(rowIndex, colIndex, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
    
        // checks for falling (\) diagonal win 
        counter = 0; // restart counter
        for (let i = 0; i < 7; i++) {
            rowIndex = row - 3 + i;
            colIndex = col - 3 + i;
            if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1 || colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
            if (this.board.check(rowIndex, colIndex, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
    
        return false; // if no winner yet, return false
    }

    gameOver() {
        this.active = false;
        this.message.innerHTML = `${this.turn.name} won!<span id="close">&times;</span>`;
        this.message.style.display = "block";
        this.closeBtn.addEventListener('click', () => {
            this.message.style.display = "none";
        })
    }

    get closeBtn() {
        return document.querySelector("#close");
    }

    bindKeys() {
        document.addEventListener('keydown', (event) => {
            if (event.code === "KeyN") this.reset();
            if (this.active) {
                switch (event.code) {
                    case "ArrowLeft":
                        this.currentChecker.move(-1);
                        break;
                    case "ArrowRight":
                        this.currentChecker.move(1);
                        break;
                    case "ArrowDown":
                        this.markAndDrop(this.currentChecker.col);
                        break;
                }
            }
        })
    }
}