const Lesson = require("./models").Lesson;
const User = require("./models").User;

module.exports = {
    getAllLessons(options, callback){
        console.log("getAllLessons");
        return Lesson.findAll({
            where: options
        })
        .then((lessons) => {
            callback(null, lessons);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addLesson(newLesson, callback){
        return Lesson.create({
            title: newLesson.title,
            body: newLesson.body,
            description: newLesson.description,
            userId: newLesson.userId
        })
        .then((lesson) => {
            callback(null, lesson);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        })
    },
    getLesson(id, callback){
        console.log("getLesson");
        return Lesson.findById(id)
        .then((lesson) => {
            console.log(lesson)
            callback(null, lesson);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        })
    },
    deleteLesson(req, callback){
        return Lesson.findById(req.params.id)
        .then((lesson) => {
            lesson.destroy()
            .then((res) => {
                callback(null, lesson);
            });
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateLesson(req, updatedLesson, callback){
        return Lesson.findById(req.params.id)
        .then((lesson) => {
            if(!lesson){
                return callback("Lesson not found");
            }
            lesson.update(updatedLesson, {
                fields: Object.keys(updatedLesson)
            })
            .then(() => {
                callback(null, lesson);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }
}