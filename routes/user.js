const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const UserController = require("../controllers/user");

// Singhup
router
  .route("/signup")
  .get(UserController.SignupForm)
  .post(saveRedirectUrl, wrapAsync(UserController.Signup));

// LOGIN
router
  .route("/login")
  .get(UserController.LoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    UserController.Login
  );

// logout
router.get("/logout", UserController.Logout);
module.exports = router;
