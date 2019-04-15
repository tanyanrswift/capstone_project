const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const Lesson = require("../../src/db/models").Lesson;

router.get("/lessons", lessonController.index);

module.exports = router;