let gameStart = false;
let gameOver = false;
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
const msg = document.querySelector("#message");

let spaces = [];

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

startGame();

function startGame() {
    gameStart = true;
    const newChecker = document.createElement("div");
    newChecker.className = "checker";
    newChecker.id = "current-checker"
    checkers.appendChild(newChecker);
}


// EVENT LISTENERS
// When user clicks the new game button, create and display the game board
newGameBtn.addEventListener('click', () => {
    msg.style.display = "none";

    const allCheckers = document.getElementsByClassName("checker");
    Array.from(allCheckers).forEach(checker => {
        checker.removeAttribute("id");
        checker.style.transitionDuration = "1.75s";
        checker.style.top = "100vh"
        checker.addEventListener("webkitTransitionEnd", () => {
            checker.remove();
        });
    });

    for (let i = 0; i < NUM_OF_ROWS; i++) {
        for (let j = 0; j < NUM_OF_COLS; j++) {
            spaces[i][j] = 0;
        }
    }

    startGame();
});

// When user hovers over spaces on the board, display the checker above that column
board.addEventListener('mouseover', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        const currentChecker = document.querySelector("#current-checker");
        // const col = parseInt(element.id[2]) - 1;
        // currentChecker.style.left = BOARD_PADDING + (BOARD_GUTTER + SPACE_SIZE) * col;
        currentChecker.classList = `checker col${element.id[2]} ${p1Turn ? "p1-checker" : "p2-checker"}`;
    }
});

// When user clicks on the board, drop the checker
board.addEventListener('click', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        const currentChecker = document.querySelector("#current-checker");
        currentChecker.classList = `checker col${element.id[2]} ${p1Turn ? "p1-checker" : "p2-checker"}`;

        // const row = parseInt(element.id[0]) - 1;
        const col = parseInt(element.id[2]) - 1;
        for (let i = NUM_OF_ROWS - 1; i >= 0; i--) {
            if (spaces[i][col] === 0) {
                const currentChecker = document.querySelector("#current-checker");
                currentChecker.style.top = `calc(var(--board-gutter) * ${2 * i + 1} + var(--space-size) * ${i})`;

                if (p1Turn) spaces[i][col] = 1; // put 1 for player 1 and 2 for player 2
                else spaces[i][col] = 2;

                if (isWinner(p1Turn ? 1 : 2, i, col)) {
                    gameStart = false;
                        msg.innerHTML = `${p1Turn ? "Player 1" : "Player 2"} won!<span id="close">&times;</span>`;
                        msg.style.display = "block";
                        const closeBtn = document.querySelector("#close")
                        closeBtn.addEventListener('click', () => {
                            msg.style.display = "none";
                        })
                } else {
                    p1Turn = !p1Turn;

                    const newChecker = document.createElement("div");
                    newChecker.className = `checker col${element.id[2]} ${p1Turn ? "p1-checker" : "p2-checker"}`;
                    newChecker.id = currentChecker.id;
                    checkers.appendChild(newChecker);
                    currentChecker.removeAttribute("id");
                }
                break;
            }
        }

        console.log(spaces);
    }
});

// checks if dropping the checker at row, col leads to a four in a row (i.e. a win)
function isWinner(playerID, row, col) {
    let counter = 0; // number of same color checkers in the row so far
    let rowIndex; // row index to check
    let colIndex; // col index to check

    // checks for vertical win
    for (let i = 0; i < 7; i++) {
        rowIndex = row - 3 + i;
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
        if (spaces[rowIndex][col] === playerID) {
            counter++;
            if (counter === 4) return true;
        } else counter = 0;
    }

    // checks for horizontal win
    counter = 0; // restart counter
    for (let i = 0; i < 7; i++) {
        colIndex = col - 3 + i;
        if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[row][colIndex] === playerID) {
            counter++;
            if (counter === 4) return true;
        } else counter = 0;
    }
    
    // checks for rising (/) diagonal win
    counter = 0; // restart counter
    for (let i = 0; i < 7; i++) {
        rowIndex = row + 3 - i;
        colIndex = col - 3 + i;
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
        if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[rowIndex][colIndex] === playerID) {
            counter++;
            if (counter === 4) return true;
        } else counter = 0;
    }

    // checks for falling (\) diagonal win 
    counter = 0; // restart counter
    for (let i = 0; i < 7; i++) {
        rowIndex = row - 3 + i;
        colIndex = col - 3 + i;
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
        if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[rowIndex][colIndex] === playerID) {
            counter++;
            if (counter === 4) return true;
        } else counter = 0;
    }

    return false; // if no winner yet, return false
}

function checkForWin(playerID, row, col) {
    let vCounter = 0; // number of same color checkers in vertical row
    let hCounter = 0; // number of same color checkers in horizontal row
    let rdCounter = 0; // number of same color checkers in rising diagonal
    let fdCounter = 0; // number of same color checkers in falling diagonal

    for (let i = 0; i < 7; i++) {
        // checks for vertical win
        let rowIndex = row - 3 + i;
        if (rowIndex > 0 && rowIndex < NUM_OF_ROWS) {
            if (spaces[rowIndex][col] === playerID) {
                vCounter++;
                if (vCounter === 4) return true;
            } else vCounter = 0;
        };
""
        // checks for horizontal win
        let colIndex = col - 3 + i;
        if (colIndex > 0 && colIndex < NUM_OF_COLS) {
            if (spaces[row][colIndex] === playerID) {
                hCounter++;
                if (hCounter === 4) return true;
            } else hCounter = 0;
        };

        // checks for rising (/) diagonal win
        rowIndex = row + 3 - i;
        colIndex = col - 3 + i;
        if (rowIndex > 0 && rowIndex < NUM_OF_ROWS && colIndex > 0 && colIndex < NUM_OF_COLS) {
            if (spaces[rowIndex][colIndex] === playerID) {
                rdCounter++;
                if (rdCounter === 4) return true;
            } else rdCounter = 0;
        };

        // checks for falling (\) diagonal win 
        rowIndex = row - 3 + i;
        colIndex = col - 3 + i;
        if (rowIndex > 0 && rowIndex < NUM_OF_ROWS && colIndex > 0 && colIndex < NUM_OF_COLS) {
            if (spaces[rowIndex][colIndex] === playerID) {
                fdCounter++;
                if (fdCounter === 4) return true;
            } else fdCounter = 0;
        };
    }

    return false; // if no winner yet, return false
}