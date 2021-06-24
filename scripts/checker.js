const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols');

export default class Checker {
    constructor(owner, initCol = 3) {
        this.owner = owner; // player who owns this checker
        this.DOMNode = this.drawChecker(initCol); // DOM node of this checker
        this.show();
    }

    get checkersContainer() {
        return document.querySelector("#checkers");
    }

    // returns the html for the new checker after creating it
    drawChecker(initCol) {
        const newChecker = document.createElement("div");
        newChecker.className = "checker";
        newChecker.setAttribute("tabindex", "0");
        newChecker.setAttribute("col", initCol);
        newChecker.style.left = `calc(var(--board-gutter) * ${2 * initCol + 1} + var(--space-size) * ${initCol})`;
        this.checkersContainer.appendChild(newChecker);
        return newChecker;
    }

    // displays the checker by providing it a background color
    show() {
        this.DOMNode.style.backgroundColor = this.owner.color;
    }

    get col() {
        return parseInt(this.DOMNode.getAttribute("col"));
    }

    // moves the checkers by colsToMoveBy columns
    move(colsToMoveBy) {
        const finalCol = this.col + colsToMoveBy;
        if (finalCol >= 0 && finalCol < NUM_OF_COLS) {
            this.DOMNode.style.left = `calc(var(--board-gutter) * ${2 * finalCol + 1} + var(--space-size) * ${finalCol})`;
            this.DOMNode.setAttribute("col", finalCol)
        }
    }

    // drops the checker spaces number of spaces
    drop(spaces) {
        this.DOMNode.removeAttribute("tabindex");
        this.DOMNode.style.top = `calc(var(--board-gutter) * ${2 * spaces + 1} + var(--space-size) * ${spaces})`;
    }
}

