const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchAsync");
const Kocamp = require("../models/kocamp");
const Review = require("../models/reviews");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

router.post(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const kocamp = await Kocamp.findById(req.params.id);
    const review = await new Review(req.body.review);
    review.author = req.user._id;
    kocamp.reviews.push(review);
    await review.save();
    await kocamp.save();
    res.redirect(`/kocamps/${kocamp._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const kocamp = await Kocamp.findById(req.params.id);
    await Kocamp.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/kocamps/${kocamp._id}`);
  })
);

module.exports = router;
