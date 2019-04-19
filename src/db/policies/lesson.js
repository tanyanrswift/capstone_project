const ApplicationPolicy = require("./application");

module.exports = class LessonPolicy extends ApplicationPolicy {

    show() {
        return (this._isStudent() || this._isTeacher());
    }

    new() {
        return (this._isTeacher());
    }

    create() {
        return this.new();
    }

    edit() {
        return (this._isTeacher());
    }

    update() {
        return this.edit();
    }

    destroy() {
        return (this._isTeacher());
    }
}