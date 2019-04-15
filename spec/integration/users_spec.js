const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes: users", () => {
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

    describe("GET /users/sign_up", () => {
        it("should render a view with sign up form", (done) => {
            request.get(`${base}sign_up`, (err, res, body) => {
                expect(err).toBeNull();
                done();
            });
        });
    });

    describe("GET /users/sign_in", () => {
        it("should render a view with a sign in form", (done) => {
            request.get(`${base}sign_in`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign in");
                done();
            });
        });
    });

    describe("POST /users", () =>{
        it("should create a new user with valid values and redirect", (done) => {
            const options = {
                url: base,
                form: {
                    email: "example123@example.com",
                    username: "example123",
                    password: "password1"
                }
            }
            
            request.post(options,
                (err, res, body) => {
                    User.findOne({where: {email: "example123@example.com"}})
                    .then((user) => {
                        expect(user).not.toBeNull();
                        console.log(user);
                        expect(user.email).toBe("example123@example.com");
                        expect(user.username).toBe("example123");
                        expect(user.id).toBe(1);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });

        it("should not create a new user with invalid attributes and redirect", (done) => {
            request.post(
                {
                    url: base,
                    form: {
                        email: "emailAddress",
                        username: "username",
                        password: "password1"
                    }
                },
                (err, res, body) => {
                    User.findOne({where: {email: "emailAddress"}})
                    .then((user) => {
                        expect(user).toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });
});