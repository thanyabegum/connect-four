export default class Player {
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