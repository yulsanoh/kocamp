const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Kocamp = require("../models/kocamp");
const { isLoggedIn, isAuthor } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: "pk.eyJ1IjoieXVsc2Fub2hkZXYiLCJhIjoiY2w4c3R1cDkyMDB4NTNubXA5dHk3NXBocyJ9.orUAEEr4gYTgYfyJoI7xdg" });

router.get(
  "/",
  catchAsync(async (req, res) => {
    const kocamps = await Kocamp.find({});
    res.render("kocamps/index", { kocamps });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("kocamps/new");
});

router.post(
  "/",
  isLoggedIn,
  upload.array("kocamp[image]"),
  catchAsync(async (req, res) => {
    const geoData = await geocoder
      .forwardGeocode({
        query: req.body.kocamp.location,
        limit: 1,
      })
      .send();
    const kocamp = new Kocamp(req.body.kocamp);
    kocamp.geometry = geoData.body.features[0].geometry;
    kocamp.images = req.files.map((file) => ({ url: file.path, filename: file.filename }));
    kocamp.author = req.user._id;
    await kocamp.save();
    console.log(kocamp);
    res.redirect(`kocamps/${kocamp._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const kocamp = await Kocamp.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    res.render("kocamps/show", { kocamp });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const kocamp = await Kocamp.findById(req.params.id);
    res.render("kocamps/edit", { kocamp });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("kocamp[image]"),
  catchAsync(async (req, res) => {
    const kocamp = await Kocamp.findByIdAndUpdate(req.params.id, {
      ...req.body.kocamp,
    });
    const imgs = req.files.map((file) => ({ url: file.path, filename: file.filename }));
    kocamp.images.pop();
    kocamp.images.push(...imgs);
    // kocamp.location = req.body.kocamp.location;
    res.redirect(`/kocamps/${kocamp._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    await Kocamp.findByIdAndDelete(req.params.id);
    res.redirect("/kocamps");
  })
);

module.exports = router;
