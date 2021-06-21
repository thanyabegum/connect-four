import Board from './board.js'
import Checker from './checker.js';

const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols');
const NUM_OF_ROWS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-rows');

export default class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.bindNewGameBtn();
    }

    get turn() {
        return this._turn;
    }

    get players() {
        return [this.player1, this.player2];
    }

    get winner() {
        if (this._active) return "No winner";
        return this._winner;
    }

    // When user clicks the new game button, create and display the game board
    bindNewGameBtn() {
        const newGameBtn = document.querySelector("#new-game"); // New game button
        newGameBtn.addEventListener('click', () => {
            this._active = true;
            this._turn = this.player1;
            this.board = new Board(NUM_OF_ROWS, NUM_OF_COLS);
            this.currentChecker = new Checker(this._turn);
        });
    }

    // switches turn to next player
    switchTurn() {
        if (this._turn === this.player1) {
            this._turn = this.player2;
        } else this._turn = this.player1;
    }

    // checks if dropping the checker at row, col leads to a four in a row (i.e. a win)
    checkForWinner(col, row) {
        
    }

    // ends game by changing game activity and setting the winner
    gameOver(winner) {
        this._active = false;
        this._winner = winner;
    }
}