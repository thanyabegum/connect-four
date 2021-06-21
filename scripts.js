let gameStart = false;
let p1Turn = true;

// GAME CONSTANTS
const NUM_OF_COLS = getComputedStyle(document.documentElement)
.getPropertyValue('--num-of-cols'); // Number of columns on the game board
const NUM_OF_ROWS = getComputedStyle(document.documentElement)
.getPropertyValue('--num-of-rows');; // Number of rows on the game board
const SPACE_SIZE = parseInt(getComputedStyle(document.documentElement)
.getPropertyValue('--space-size'));
const BOARD_GUTTER = parseInt(getComputedStyle(document.documentElement)
.getPropertyValue('--board-gutter'));
const BOARD_PADDING = parseInt(getComputedStyle(document.documentElement)
.getPropertyValue('--board-padding'));

// ELEMENTS
const newGameBtn = document.querySelector("#new-game"); // New game button
const board = document.querySelector("#board");
const checkers = document.querySelector("#checkers");
let spaces = [];

// EVENT LISTENERS
// When user clicks the new game button, create and display the game board
newGameBtn.addEventListener('click', () => {
    gameStart = true;
    newGameBtn.remove();
    document.querySelector("h1").remove();

    for (let i = 1; i <= NUM_OF_ROWS; i++) {
        let temp = [];
        for (let j = 1; j <= NUM_OF_COLS; j++) {
            const space = document.createElement("div");
            space.classList = "space";
            space.id = `${i}-${j}`;
            board.appendChild(space);
            temp.push(0);
        }
        spaces.push(temp);
    }
    console.log(spaces);

    board.classList = "grid";

    const newChecker = document.createElement("div");
    newChecker.className = "checker";
    newChecker.id = "current-checker"
    checkers.appendChild(newChecker);
});

// When user hovers over spaces on the board, display the checker above that column
board.addEventListener('mouseover', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        const currentChecker = document.querySelector("#current-checker");
        currentChecker.classList = `checker col${element.id[2]} ${p1Turn ? "p1-checker" : "p2-checker"}`;
    }
});

// When user clicks on the board, drop the checker
board.addEventListener('click', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        // const row = parseInt(element.id[0]) - 1;
        const col = parseInt(element.id[2]) - 1;
        for (let i = NUM_OF_ROWS - 1; i >= 0; i--) {
            if (spaces[i][col] === 0) {
                const currentChecker = document.querySelector("#current-checker");
                const dropSize = BOARD_PADDING + (BOARD_GUTTER + SPACE_SIZE) * i;
                currentChecker.style.top = `${dropSize}px`;

                const newChecker = document.createElement("div");
                newChecker.className = `checker col${element.id[2]} ${p1Turn ? "p1-checker" : "p2-checker"}`;
                newChecker.id = currentChecker.id;
                checkers.appendChild(newChecker);
                currentChecker.removeAttribute("id");

                if (p1Turn) spaces[i][col] = 1; // put 1 for player 1 and 2 for player 2
                else spaces[i][col] = 2;
                p1Turn = !p1Turn;
                checkforWin(i, col);
                break;
            }
        }

        console.log(spaces);
    }
});

// checks if dropping the checker at row, col leads to a win
function checkforWin(row, col) {
    
}