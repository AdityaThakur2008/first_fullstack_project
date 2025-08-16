const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrapAsync");
const ReviewController = require("../controllers/review.js");
const {
  isLoggedin,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");

// POST review
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapasync(ReviewController.PostReview)
);

// DELETE review
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapasync(ReviewController.DistroyReview)
);

module.exports = router;
