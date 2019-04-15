const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('#create()', () => {
        it("should create a User object with a valid email and password", (done) => {
            User.create({
                email: "example123@example.com",
                username: "example123",
                password: "password1"
            })
            .then((user) =>{
                expect(user.email).toBe("example123@example.com");
                expect(user.username).toBe("example123");
                expect(user.id).toBe(1);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a user with invalid email, username, or password", (done) =>{
            User.create({
                email: "username",
                username: "username@example.com",
                password: "password1"
            })
            .then((user) => {
                done();
            })
            .catch((err)=> {
                expect(err.message).toContain("Validation error: must be a valid email");
                done();
            });
        });

        it("should not create a user with an email already taken", (done) => {
            User.create({
                email: "example123@example.com",
                username: "username1",
                password: 'password1'
            })
            .then((user) => {
                User.create({
                    email: "example123@example.com",
                    username: "username1",
                    password: "password1"
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Validation error");
                    done();
                });
                
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a user with a username already taken", (done) => {
            User.create({
                email: "example123@example.com",
                username: "username1",
                password: 'password1'
            })
            .then((user) => {
                User.create({
                    email: "example123@example.com",
                    username: "username1",
                    password: "password1"
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Validation error");
                    done();
                });
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});