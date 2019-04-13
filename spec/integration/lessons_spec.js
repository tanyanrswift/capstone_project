const server = require("../../src/server");
const base = "http://localhost:3000/users";
const Lesson = require("../../src/db/models").Lesson;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes: lessons", () => {
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

    describe("GET /lessons", () => {
        it("should return a status code 200 and all lessons", (done) => {
            request.get(`${base}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("");
                done();
            });
        });
    });
});