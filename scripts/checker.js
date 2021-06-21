export default class Checker {
    constructor(owner) {
        this.owner = owner;
        this.drawChecker();
    }

    drawChecker() {
        const checkers = document.querySelector("#checkers");
        const newChecker = document.createElement("div");
        newChecker.className = `checker p${this.owner.id}-checker`;
        // newChecker.id = "current-checker";
        checkers.appendChild(newChecker);
    }

    drop(size, callback) {

    }
}

