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
                if (isWinner(p1Turn ? 1 : 2, i, col)) {
                    alert(`${p1Turn ? "Player 1" : "Player 2"} won!`);
                };
                p1Turn = !p1Turn;
                break;
            }
        }

        console.log(spaces);
    }
});

// checks if dropping the checker at row, col leads to a four in a row (i.e. a win)
function isWinner(playerID, row, col) {
    let counter = 0; // number of same colors checkers in the row so far
    let rowIndex; // row index to check
    let colIndex; // col index to check

    // checks for vertical win
    for (let i = 0; i < 7; i++) {
        rowIndex = row - 3 + i;
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
        if (spaces[rowIndex][col] === playerID) counter++;
        if (counter === 4) return true;
    }

    // checks for horizontal win
    counter = 0; // restart counter
    for (let i = 0; i < 7; i++) {
        colIndex = col - 3 + i;
        if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[row][colIndex] === playerID) counter++;
        if (counter === 4) return true;
    }
    
    // checks for rising (/) diagonal win
    counter = 0; // restart counter
    for (let i = 0; i < 7; i++) {
        rowIndex = row + 3 - i;
        colIndex = col - 3 + i;
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
        if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[rowIndex][colIndex] === playerID) counter++;
        if (counter === 4) return true;
    }

    // checks for falling (\) diagonal win 
    counter = 0; // restart counter
    for (let i = 0; i < 7; i++) {
        rowIndex = row - 3 + i;
        colIndex = col - 3 + i;
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1) continue;
        if (colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[rowIndex][colIndex] === playerID) counter++;
        if (counter === 4) return true;
    }

    return false; // if no winner yet, return false
}