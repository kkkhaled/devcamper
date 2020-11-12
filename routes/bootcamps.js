const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  CreateBootcamp,
  UpdateBootcamp,
  DeleteBootcamp,
  getBootcampsinRadius,
  bootcampPhotoUpload,
} = require("../controller/bootcamps");

const { protect, authorize } = require("../middleware/auth");

const advancedResult = require("../middleware/advancedResult");
const Bootcamp = require("../models/Bootcamp");

// router for courses resourses
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router
  .route("/")
  .get(advancedResult(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), CreateBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), UpdateBootcamp)
  .delete(protect, authorize("publisher", "admin"), DeleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsinRadius);
router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
