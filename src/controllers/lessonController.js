const lessonQueries = require("../db/queries.lessons.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    index(req, res, next) {
        let currentUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            //role: req.user.role,
            //id: req.user.id
        }
        lessonQueries.getAllLessons(req, (err, lessons) => {
            if(err){
                console.log(err);
                res.redirect(500, "static/index");
            } else {
                console.log("Index Lessons");
                res.render("lessons/index");
            }
        })
    },
    new(req, res, next) {
        res.render("lessons/new");
    },
    create(req, res, next) {
        let newLesson = {
            title: req.body.title,
            body: req.body.body,
            description: req.body.description,
            userId: req.user.id
        };
        lessonQueries.addLesson(newLesson, (err, lesson) => {
            if(err){
                req.flash("notice", "Failed to create a new lesson");
                res.redirect(500, "/lessons/new");
                console.log("newLesson:failed");
            } else {
                req.flash("notice", "Lesson created succesfully");
                res.redirect(303, `/lessons/${lesson.id}`);
                console.log(newLesson);
            }
        })
    },
    show(req, res, next) {
        lessonQueries.getLesson(req.params.id, (err, lesson) => {
            if(err || lesson == null) {
                res.redirect(404, "/");
            } else {
                console.log(lesson)
                res.render("lessons/show", {lesson});
            }
        });
    },
    destroy(req, res, next) {
        lessonQueries.deleteLesson(req, (err, lesson) => {
            if(err){
                res.redirect(500, `/lessons/${req.params.id}`)
            } else {
                res.redirect(303, "/lessons")
            }
        });
    },
    edit(req, res, next){
        lessonQueries.getLesson(req.params.id, (err, lesson) => {
            if(err || lesson == null){
                res.redirect(404, "/");
            } else {
                res.render("lessons/edit", {lesson});
            }
        });
    },
    update(req, res, next){
        lessonQueries.updateLesson(req, req.body, (err, lesson) => {
            if(err || lesson == null){
                res.redirect(401, `/lessons/${req.params.id}/edit`);
            } else {
                console.log(lesson)
                req.flash("Lesson updated succesfully!")
                res.redirect(`/lessons/${req.params.id}`);
            }
        });
    }
}