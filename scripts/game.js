import Board from './board.js'
import Checker from './checker.js';

export default class Game {
    constructor(players) {
        this.players = players;
        this.board = new Board();
        this.startGame();
        this.bindNewGameBtn();
        this.bindMouseOver();
        this.bindMouseClick();
        this.bindKeys();
    }

    // starts game by setting game variables and drawing first checker
    startGame() {
        this.active = true;
        this.turn = this.players[0];
        this.currentChecker = new Checker(this.turn);
    }

    get newGameBtn() {
        return document.querySelector("#new-game");
    }

    get message() {
        return document.querySelector("#message");
    }

    // when user clicks on the new game button, reset the game
    bindNewGameBtn() {
        this.newGameBtn.addEventListener('click', () => {
            this.reset();
        });
    }

    get allCheckers() {
        return Array.from(document.getElementsByClassName("checker"));
    }

    // resets the game by hiding the winner message, clearing the board, and removing all used checkers
    reset() {
        this.message.style.display = "none";
        this.board.reset();
        this.allCheckers.forEach(checker => {
            checker.removeAttribute("tabindex");
            checker.style.transitionDuration = "1.75s";
            checker.style.top = "100vh" // drops checker off screen
            checker.addEventListener("webkitTransitionEnd", () => {
                checker.remove(); // deletes the checker
            });
        });
        this.startGame();
    }

    // when user hovers over spaces on the board, display the checker above that column
    bindMouseOver() {
        board.addEventListener('mouseover', (event) => {
            if (this.active && event.target.className === "space") {
                const newCol = parseInt(event.target.getAttribute("col"));
                const oldCol = parseInt(this.currentChecker.col);
                this.currentChecker.move(newCol - oldCol);
            }
        });
    }

    // when user clicks on the board, drop the checker in that column
    bindMouseClick() {
        board.addEventListener('click', (event) => {
            if (this.active && event.target.className === "space") {
                const col = parseInt(event.target.getAttribute("col"));
                this.markAndDrop(col);
            }
        });
    }

    // finds the first empty space in col column, marks it, drops the checker, and then checks if that wins the game
    // if it wins the game, then game over. if not, then switches turn and shows next player's checker
    markAndDrop(col) {
        for (let i = this.board.rows - 1; i >= 0; i--) {
            if (this.board.check(i, col, 0)) {
                this.currentChecker.drop(i);
                this.board.mark(i, col, this.turn.id)
    
                if (this.checkForWinner(i, col)) {
                    this.gameOver();
                } else {
                    this.switchTurn();
                    this.currentChecker = new Checker(this.turn, col);
                }
                break;
            }
        }
    }

    // switches turn
    switchTurn() {
        if (this.turn === this.players[0]) {
            this.turn = this.players[1];
        } else this.turn = this.players[0];
    }

    // returns true if dropping the checker at (row, col) leads to a four in a row (i.e. a win)
    // returns false otherwise
    checkForWinner(row, col) {
        const playerID = this.turn.id;
        let counter = 0; // number of same color checkers in the row so far
        let rowIndex; // row index to check
        let colIndex; // col index to check
    
        // checks for vertical win
        for (let i = 0; i < 7; i++) {
            rowIndex = row - 3 + i;
            if (rowIndex < 0 || rowIndex > this.board.rows - 1) continue;
            if (this.board.check(rowIndex, col, playerID)) {
                counter++;
                if (counter === 4) return true; // if there is a winner, return true
            } else counter = 0;
        }
    
        // checks for horizontal win
        counter = 0; // restart counter
        for (let i = 0; i < 7; i++) {
            colIndex = col - 3 + i;
            if (colIndex < 0 || colIndex > this.board.cols - 1) continue;
            if (this.board.check(row, colIndex, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
        
        // checks for rising (/) diagonal win
        counter = 0;
        for (let i = 0; i < 7; i++) {
            rowIndex = row + 3 - i;
            colIndex = col - 3 + i;
            if (rowIndex < 0 || rowIndex > this.board.rows - 1 || colIndex < 0 || colIndex > this.board.cols - 1) continue;
            if (this.board.check(rowIndex, colIndex, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
    
        // checks for falling (\) diagonal win 
        counter = 0; 
        for (let i = 0; i < 7; i++) {
            rowIndex = row - 3 + i;
            colIndex = col - 3 + i;
            if (rowIndex < 0 || rowIndex > this.board.rows - 1 || colIndex < 0 || colIndex > this.board.cols - 1) continue;
            if (this.board.check(rowIndex, colIndex, playerID)) {
                counter++;
                if (counter === 4) return true;
            } else counter = 0;
        }
    
        return false; // if no winner yet, return false
    }

    get closeBtn() {
        return document.querySelector("#close");
    }

    // ends game and displays message with winner's name
    gameOver() {
        this.active = false;
        this.message.innerHTML = `${this.turn.name} won!<span id="close" tabindex="0">&times;</span>`;
        this.message.style.display = "block";
        this.closeBtn.addEventListener('click', () => {
            this.message.style.display = "none";
        })
        this.closeBtn.addEventListener('keydown', (event) => {
            if (event.code === "Enter") this.message.style.display = "none";
        })
    }

    // when user uses the arrow keys to move the checker, execute the corresponding motion
    // when user taps N key, resets game
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