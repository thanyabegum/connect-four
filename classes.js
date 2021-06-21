class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this._turn = player1;
        this._active = true;
    }

    set active(value) {
        this._active = value;
    }

    get active() {
        return this._active;
    }

    get turn() {
        return this._turn;
    }

    get players() {
        return [this.player1, this.player2];
    }

    switchTurn() {
        if (this._turn === this.player1) {
            this._turn = this.player2;
        } else this._turn = this.player1;
    }
}

class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this._active = false;
    }

    set active(value) {
        this._active = value;
    }

    get active() {
        return this._active;
    }
}

class Board {
    constructor() {

    }
}

class Checker {
    constructor(owner) {
        this.owner = owner;
    }

    get owner() {
        return this.owner;
    }

    drawChecker() {

    }

    drop(callback) {

    }
}