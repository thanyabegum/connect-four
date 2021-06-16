/* CLASSES:
- game.js for game logic (starting game, checking if there is a winner, alternating players)
- board.js for 
- checker.js for the checkers (21 of each color)
*/

/* USER FLOW:
- Screen 1: Name of game with a button. 
- On click of button, create new game and replace button with the game board

- Screen 2: Game board. 
- First player prompted that it's their turn
- Hovering over column highlights that column, shows checker there
- Clicking on spot drops checker
*/

let gameStart = false;
let p1Turn = true;

// GAME CONSTANTS
const NUM_OF_COLS = 7; // Number of columns on the game board
const NUM_OF_ROWS = 6; // Number of rows on the game board

// ELEMENTS
const newGameBtn = document.querySelector("#new-game"); // New game button
const board = document.querySelector("#board");
const possiblePosition = document.querySelector("#possible-position");

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
});

board.addEventListener('mouseover', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        possiblePosition.classList = `col${element.id[0]} ${p1Turn ? "p1-checker" : "p2-checker"}`;
    }
});

// // Checker above board will disappear if user is not hovering over the board
// board.addEventListener('mouseout', () => {    
//     if (gameStart) {
//         possiblePosition.classList.add("transparent");
//     }
// });

board.addEventListener('click', (event) => {
    const element = event.target;
    
    if (gameStart && element.className === "space") {
        p1Turn = !p1Turn;
        possiblePosition.classList.add("drop");
    }
});