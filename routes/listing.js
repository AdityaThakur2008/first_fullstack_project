const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapAsync");
const ListingController = require("../controllers/listings.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapasync(ListingController.AllListings))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    wrapasync(ListingController.CreateListing)
  );

router.get("/new", isLoggedin, ListingController.NewListingForm);

router
  .route("/:id")
  .get(wrapasync(ListingController.ShowListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    wrapasync(ListingController.UpdateListing)
  )
  .delete(isLoggedin, isOwner, wrapasync(ListingController.DestroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapasync(ListingController.EditForm)
);

module.exports = router;
