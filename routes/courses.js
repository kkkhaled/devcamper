const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  UpdateCourse,
  deleteCourse,
} = require("../controller/courses");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

const Course = require("../models/Course");
const advancedResult = require("../middleware/advancedResult");

router
  .route("/")
  .get(
    advancedResult(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), UpdateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
