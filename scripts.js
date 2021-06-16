/* CLASSES:
- game.js for game logic (starting game, checking if there is a winner, alternating players)
- board.js for 
- checker.js for the checkers (21 of each color)
- 
*/

/* USER FLOW:
- Screen 1: Name of game with a button. 
- On click of button, create new game and replace button with the game board

- Screen 2: Game board. 
- First player prompted that it's their turn
- Hovering over column highlights that column, shows checker there
- Clicking on spot drops checker
*/

// GAME CONSTANTS
const NUM_OF_COLS = 7; // Number of columns on the game board
const NUM_OF_ROWS = 6; // Number of rows on the game board

// ELEMENTS
const newGameBtn = document.querySelector("#new-game"); // New game button
const board = document.querySelector('#board');

// EVENT LISTENERS
// When user clicks the new game button, create and display the game board
newGameBtn.addEventListener('click', () => {
    newGameBtn.remove();

    for (let i = 0; i < NUM_OF_COLS * NUM_OF_ROWS; i++) {
        const space = document.createElement("div");
        space.classList = "space";
        board.appendChild(space);
    }

    board.classList = "grid";
})