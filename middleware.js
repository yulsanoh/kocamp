const Kocamp = require("./models/kocamp");
const Review = require("./models/reviews");

module.exports.isLoggedIn = (req, res, next) => {
  console.log("req.user...", req.user);
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const kocamp = await Kocamp.findById(req.params.id);
  if (!kocamp.author.equals(req.user._id)) {
    return res.redirect(`/kocamps/${req.params.id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review.author.equals(req.user._id)) {
    return res.redirect(`/kocamps/${req.params.id}`);
  }
  next();
};
