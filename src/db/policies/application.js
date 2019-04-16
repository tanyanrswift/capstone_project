module.exports = class ApplicationPolicy {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isStudent() {
        return this.user.role == "student";
    }

    _isTeacher() {
        return this.user.role == "teacher";
    }
}