const NUM_OF_COLS = getComputedStyle(document.documentElement).getPropertyValue('--num-of-cols');

export default class Checker {
    constructor(owner, initCol = 3) {
        this.owner = owner;
        this.DOMNode = this.drawChecker(initCol);
        this.show();
    }

    get checkersContainer() {
        return document.querySelector("#checkers");
    }

    drawChecker(initCol) {
        const newChecker = document.createElement("div");
        newChecker.className = "checker";
        newChecker.id = "current-checker";
        newChecker.setAttribute("tabindex", "0");
        newChecker.setAttribute("col", initCol);
        newChecker.style.left = `calc(var(--board-gutter) * ${2 * initCol + 1} + var(--space-size) * ${initCol})`;
        this.checkersContainer.appendChild(newChecker);
        return newChecker;
    }

    show() {
        this.DOMNode.style.backgroundColor = `${this.owner.id === 1 ? "var(--primary-color)" : "var(--secondary-color)"}`;
    }

    get col() {
        return parseInt(this.DOMNode.getAttribute("col"));
    }

    move(colsToMoveBy) {
        const finalCol = this.col + colsToMoveBy;
        if (finalCol >= 0 && finalCol < NUM_OF_COLS) {
            this.DOMNode.style.left = `calc(var(--board-gutter) * ${2 * finalCol + 1} + var(--space-size) * ${finalCol})`;
            this.DOMNode.setAttribute("col", finalCol)
        }
    }

    drop(spaces) {
        this.DOMNode.style.top = `calc(var(--board-gutter) * ${2 * spaces + 1} + var(--space-size) * ${spaces})`;
    }
}

