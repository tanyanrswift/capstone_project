const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const Lesson = require("../../src/db/models").Lesson;

router.get("/lessons", lessonController.index);
router.get("/lessons/new", lessonController.new);
router.post("/lessons/create", lessonController.create);
router.get("/lessons/:id", lessonController.show);
router.post("/lessons/:id/destroy", lessonController.destroy);
router.get("/lessons/:id/edit", lessonController.edit);
router.post("/lessons/:id/update", lessonController.update);

module.exports = router;