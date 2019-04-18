const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";
const Lesson = require("../../src/db/models").Lesson;
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("routes: lessons", () => {
    beforeEach((done) => {
        this.user = user;
        this.lesson = lesson;

        sequelize.sync({force: true}).then((res) => {
            User.create({
                email: "example123@example.com",
                username: "example",
                password: "password1"
            })
            .then((user) => {
                this.user = user;
                request.get({
                    url: "http://localhost:3000/auth/fake",
                    form: {
                        userId: user.id,
                        email: user.email
                    }
                });

                Lesson.create({
                    title: "Musical Alphabet",
                    body: "Etc",
                    description: "Learn about the basic building blocks of reading music-notes-and how the musical alphabet is structured.",
                    userId: user.id
                })
                .then((lesson) => {
                    this.lesson = lesson;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

        describe("GET /lessons", () => {
            it("should return a status code 200 and all lessons", (done) => {
                request.get(`${base}`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(res.statusCode).toBe(200);
                    expect(body).toContain("Lessons");
                    expect(body).toContain("Musical Alphabet")
                    done();
                });
            });
        });
    
        
        describe("GET /lessons/new", () => {
            it("should render a new lesson form", (done) => {
                request.get(`{base}new`, (err, res, body) => {
                    err(err).toBeNull();
                    expect(body).toContain("New Lesson");
                    done();
                });
            });
        });
    
        describe("POST /lessons/create", () => {
            it("should create a new lesson and redirect", (done) => {
                const options = {
                    url: `${base}create`,
                    form: {
                        title: "Musical Notation/Staff",
                        body: "Etc",
                        description: "Learn what the staff is and how we notate music",
                        userId: this.user.id
                    }
                };
    
                request.post(options,
                    (err, res, body) => {
                        Lesson.findOne({where: {title: "Musical Notation/Staff"}})
                        .then((lesson) => {
                            expect(res.statusCode).toBe(303);
                            expect(lesson.title).toBe("Musical Notation/Staff");
                            expect(lesson.body).toBe("Etc");
                            expect(lesson.description).toBe("Learn what the staff is and how we notate music");
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

        describe("GET /lessons/:id", () => {
            it("should render a view with the selected lesson"), (done) => {
                request.get(`${base}${this.lesson.id}`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("Musical Alphabet");
                    done();
                });
            }
        });

        describe("POST /lessons/:id/destroy", () => {

            it("should delete the lesson with the associated ID", (done) => {
        
              Lesson.all()
              .then((lessons) => {
        
                const lessonCountBeforeDelete = lessons.length;
        
                expect(lessonCountBeforeDelete).toBe(1);
        
                request.post(`${base}${this.lesson.id}/destroy`, (err, res, body) => {
                  Lesson.all()
                  .then((lessons) => {
                    expect(err).toBeNull();
                    expect(lessons.length).toBe(lessonCountBeforeDelete - 1);
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                    done();
                  })
        
                });
              });
        
            });
        
          });
        
          describe("GET /lessons/:id/edit", () => {
        
            it("should render a view with an edit lesson form", (done) => {
              request.get(`${base}${this.lesson.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Lesson");
                expect(body).toContain("Musical Staff/Notation");
                done();
              });
            });
        
          });
        
          describe("POST /lessons/:id/update", () => {
        
            it("should update the lesson with the given values", (done) => {
              const options = {
                url: `${base}${this.lesson.id}/update`,
                form: {
                  title: "Musical Staff/Notation",
                  description: "Learn what the staff is and how we notate music",
                  body: "Etc",
                  userId: this.user.id
                }
              };
        
              request.post(options,
                (err, res, body) => {
        
                  expect(err).toBeNull();
                  Lesson.findOne({
                    where: { id: this.lesson.id }
                  })
                  .then((lesson) => {
                    expect(lesson.title).toBe("Musical Staff/Notation");
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                    done();
                  });
                });
              });
            });
          });
        });

    });

});