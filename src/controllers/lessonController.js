const lessonQueries = require("../db/queries.lessons.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Authorizer = require("../db/policies/lesson");

module.exports = {
    index(req, res, next) {
        const authorized = new Authorizer(req.user).show();
        let currentUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.user.role,
            id: req.user.id
        }
        if(authorized && (currentUser.role == 'teacher')){
            console.log('teacher role')
            lessonQueries.getAllLessons(req, (err, lessons) => {
                if(err){
                    console.log(err);
                    res.redirect(500, "static/index");
                } else {
                    console.log("Index Lessons");
                    res.render("lessons/index", {lessons}); //we need to pass in lessons here so that it is defined as a variable in our view
                }
            })
        } else if (authorized && (currentUser.role == 'student')){
            console.log('student role')
            lessonQueries.getAllLessons(req, (err, lessons) => {
                if(err){
                    console.log(err);
                    res.redirect(500, "static/index");
                } else {
                    console.log("Index Lessons");
                    res.render("lessons/index", {lessons}); //we need to pass in lessons here so that it is defined as a variable in our view
                }
            })
        } else {
            console.log('not authorized')
            lessonQueries.getAllLessons(req, (err, lessons) => {
                if(err){
                    console.log(err);
                    res.redirect(500, "static/index");
                } else {
                    console.log("Index Lessons");
                    res.render("lessons/index", {lessons}); //we need to pass in lessons here so that it is defined as a variable in our view
                }
            })
        }  
    },
    new(req, res, next) {
        const authorized = new Authorizer(req.user).new();
        if(authorized && (currentUser.role == 'teacher')){
            res.render("lessons/new");
        } else {
            req.flash("You are not authorized to do that!");
            res.redirect("/lessons");
        }
    },
    create(req, res, next) {
        const authorized = new Authorizer(req.user).create();
        if(authorized) {
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
        } else {
            res.redirect("/lessons");
        }
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
        const authorized = new Authorizer(req.user).destroy();
        if(authorized && (currentUser.role == 'teacher')){
            lessonQueries.deleteLesson(req, (err, lesson) => {
                if(err){
                    res.redirect(500, `/lessons/${req.params.id}`)
                } else {
                    console.log("successful lesson destroy");
                    res.redirect(303, "/lessons")
                }
            });
        } else {
            req.flash("You are not authorized to do that!");
            res.redirect("/lessons/");
        }
    },
    edit(req, res, next){
        lessonQueries.getLesson(req.params.id, (err, lesson) => {
            if(err || lesson == null){
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, lesson).edit();
                if(authorized && (currentUser.role == 'teacher')){
                    res.render("lessons/edit", {lesson});
                } else {
                    req.flash("You are not authorized to do that!");
                    res.redirect(`/lessons/${req.params.id}`);
                }
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