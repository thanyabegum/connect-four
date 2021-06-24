// GAME CONSTANTS
const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols'); // Number of columns on the game board
const NUM_OF_ROWS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-rows');; // Number of rows on the game board
const P1_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--primary-color'); // Player 1 checker color
const P2_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');; // Player 2 checker color

// ELEMENTS
const newGameBtn = document.querySelector("#new-game"); // New game button
const board = document.querySelector("#board");
const checkers = document.querySelector("#checkers");
const msg = document.querySelector("#message");
let spaces = [];

// GAME VARIABLES
let gameActive = false;
let p1Turn = false;

// Setup the board & start game
board.className = "grid";
for (let i = 0; i < NUM_OF_ROWS; i++) {
    let temp = [];
    for (let j = 0; j < NUM_OF_COLS; j++) {
        const space = document.createElement("div");
        space.className = "space";
        space.setAttribute("col", j);
        board.appendChild(space);
        temp.push(0);
    }
    spaces.push(temp);
}
startGame();

// Start game by setting game variables & drawing first checker
function startGame() {
    gameActive = true;
    p1Turn = true;
    checkers.appendChild(createChecker());
    showChecker();
}

// Creates new checker
function createChecker(initCol = 3) {
    const checker = document.createElement("div");
    checker.className = "checker";
    checker.id = "current-checker";
    checker.setAttribute("tabindex", "0");
    checker.setAttribute("col", initCol);
    checker.style.left = `calc(var(--board-gutter) * ${2 * initCol + 1} + var(--space-size) * ${initCol})`;
    return checker;
}

// When user clicks the new game button, reset the game board & clear winner message
newGameBtn.addEventListener('click', () => {
    reset();
    startGame();
});

function reset() {
    msg.style.display = "none"; // Clear winner message

    // Reset board by setting all spaces to 0
    for (let i = 0; i < NUM_OF_ROWS; i++) {
        for (let j = 0; j < NUM_OF_COLS; j++) {
            spaces[i][j] = 0;
        }
    }

    // Drop checkers out of the board, off screen & then delete them
    const allCheckers = document.getElementsByClassName("checker");
    Array.from(allCheckers).forEach(checker => {
        checker.removeAttribute("id");
        checker.style.transitionDuration = "1.75s";
        checker.style.top = "100vh"
        checker.addEventListener("webkitTransitionEnd", () => {
            checker.remove();
        });
    });
}

// When user hovers over spaces on the board, display the checker above that column
board.addEventListener('mouseover', (event) => {
    if (gameActive && event.target.className === "space") {
        const currentChecker = document.querySelector("#current-checker");
        const newCol = parseInt(event.target.getAttribute("col"));
        const oldCol = parseInt(currentChecker.getAttribute("col"));
        moveChecker(newCol - oldCol);
        showChecker();
    }
});

function showChecker() {
    const currentChecker = document.querySelector("#current-checker");
    currentChecker.style.backgroundColor = `${p1Turn ? P1_COLOR : P2_COLOR}`;
}

document.addEventListener('keydown', (event) => {
    if (event.code === "KeyN") {
        reset();
        startGame();
    }

    if (gameActive) {
        switch (event.code) {
            case "ArrowLeft":
                showChecker();
                moveChecker(-1);
                break;
            case "ArrowRight":
                showChecker();
                moveChecker(1);
                break;
            case "ArrowDown":
                const colToDrop = document.querySelector("#current-checker").getAttribute("col");
                dropChecker(colToDrop);
                break;
        }
    }
})

function moveChecker(colsToMoveBy) {    
    const currentChecker = document.querySelector("#current-checker");
    const finalCol = parseInt(currentChecker.getAttribute("col")) + colsToMoveBy;
    if (finalCol >= 0 && finalCol < NUM_OF_COLS) {
        currentChecker.style.left = `calc(var(--board-gutter) * ${2 * finalCol + 1} + var(--space-size) * ${finalCol})`;
        currentChecker.setAttribute("col", finalCol)
    }
}

// When user clicks on the board, drop the checker
board.addEventListener('click', (event) => {
    if (gameActive && event.target.className === "space") {
        const col = parseInt(event.target.getAttribute("col"));
        dropChecker(col);
    }
});

function dropChecker(col) {
    col = parseInt(col);
    for (let i = NUM_OF_ROWS - 1; i >= 0; i--) {
        if (spaces[i][col] === 0) {
            // drops the checker
            const currentChecker = document.querySelector("#current-checker");
            currentChecker.style.top = `calc(var(--board-gutter) * ${2 * i + 1} + var(--space-size) * ${i})`;

            // marks the corresponding space in the spaces array
            if (p1Turn) spaces[i][col] = 1; // put 1 for player 1 and 2 for player 2
            else spaces[i][col] = 2;

            // checks if there is a winner
            if (checkForWinner(i, col)) { // if there is, then game over & show winner message
                gameActive = false;
                showMessage();
            } else { // if there isn't, switch turns & show next player's checker
                p1Turn = !p1Turn;
                currentChecker.removeAttribute("id");
                checkers.appendChild(createChecker(col));
                showChecker();
            }
            break;
        }
    }
}

function showMessage() {
    msg.innerHTML = `${p1Turn ? "Player 1" : "Player 2"} won!<span id="close">&times;</span>`;
    msg.style.display = "block";
    const closeBtn = document.querySelector("#close")
    closeBtn.addEventListener('click', () => {
        msg.style.display = "none";
    })
}

// checks if dropping the checker at (row, col) leads to a four in a row (i.e. a win)
function checkForWinner(row, col) {
    const playerID = p1Turn ? 1 : 2;
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
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1 || colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
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
        if (rowIndex < 0 || rowIndex > NUM_OF_ROWS - 1 || colIndex < 0 || colIndex > NUM_OF_COLS - 1) continue;
        if (spaces[rowIndex][colIndex] === playerID) {
            counter++;
            if (counter === 4) return true;
        } else counter = 0;
    }

    return false; // if no winner yet, return false
}