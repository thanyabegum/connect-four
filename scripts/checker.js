export default class Checker {
    constructor(owner, initialCol) {
        this.owner = owner;
        this.drawChecker(initialCol);
    }

    get checkersContainer() {
        return document.querySelector("#checkers");
    }

    drawChecker(col) {
        const newChecker = document.createElement("div");
        newChecker.className = `checker col${col} p${this.owner.id}-checker`;
        // newChecker.id = "current-checker";
        // newChecker.left = `calc(var(--board-padding) + var(--board-gutter)*2 + var(--space-size)*2)`;
        // newChecker.top = `var(--space-above-board)`;
        this.html = newChecker;
        this.checkersContainer.appendChild(newChecker);
        if (!newChecker.previousElementSibling) {
            newChecker.style.opacity = 0;
        }
    }

    move(col) {

    }

    drop(size, callback) {

    }
}

