const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const { register } = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });
    res.redirect("/kocamps");
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
  const redirectUrl = req.session.returnTo || "/kocamps";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
