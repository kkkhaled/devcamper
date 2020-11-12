const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReviews,
  deleteReview,
} = require("../controller/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResult");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, authorize("admin", "user"), addReview);
router.route("/:id").get(getReview);
router.route("/:id").put(protect, authorize("user", "admin"), updateReviews);
router.route("/:id").delete(protect, authorize("user", "admin"), deleteReview);
module.exports = router;
