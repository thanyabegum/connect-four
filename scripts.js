let gameStart = false;
let p1Turn = true;

// GAME CONSTANTS
const NUM_OF_COLS = 7; // Number of columns on the game board
const NUM_OF_ROWS = 6; // Number of rows on the game board

// ELEMENTS
const newGameBtn = document.querySelector("#new-game"); // New game button
const board = document.querySelector("#board");
const checkers = document.querySelector("#checkers");

// EVENT LISTENERS
// When user clicks the new game button, create and display the game board
newGameBtn.addEventListener('click', () => {
    gameStart = true;
    newGameBtn.remove();
    document.querySelector("h1").remove();

    for (let i = 1; i <= NUM_OF_ROWS; i++) {
        for (let j = 1; j <= NUM_OF_COLS; j++) {
            const space = document.createElement("div");
            space.classList = "space";
            space.id = `${j}-${i}`;
            board.appendChild(space);
        }
    }

    board.classList = "grid";

    const newChecker = document.createElement("div");
    newChecker.className = "checker";
    newChecker.id = "current-checker"
    checkers.appendChild(newChecker);
});

board.addEventListener('mouseover', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        const currentChecker = document.querySelector("#current-checker");
        currentChecker.classList = `checker col${element.id[0]} ${p1Turn ? "p1-checker" : "p2-checker"}`;
    }
});

board.addEventListener('click', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        p1Turn = !p1Turn;
        const currentChecker = document.querySelector("#current-checker");
        currentChecker.classList.add("drop");

        const newChecker = document.createElement("div");
        newChecker.className = "checker";
        newChecker.id = currentChecker.id;
        checkers.appendChild(newChecker);
        currentChecker.id = "";
    }
});