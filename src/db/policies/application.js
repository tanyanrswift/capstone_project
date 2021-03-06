module.exports = class ApplicationPolicy {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isStudent() {
        return this.user && this.user.role == 1;
    }

    _isTeacher() {
        return this.user && this.user.role == 2;
    }

    new() {
        return this.new() && (this._isTeacher());
    }

    create() {
        return this.new();
    }

    show() {
        return true;
    }

    edit() {
        return this.new() && this.record && (this._isTeacher());
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this.update();
    }
}