require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const session = require("express-session");
const cookie = require("express-session/session/cookie.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const UserRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017/WonderLust";
const qloud_url = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASS}@cluster0.e4ti0va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
main()
  .then(() => {
    console.log("conected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(qloud_url);
}

console.log("views path:", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.redirect("/listings");
});

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});

app.use("/", UserRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, " Page NOT found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = " Something Went Wrong" } = err;

  res.status(statusCode).render("errors/error.ejs", { err });
});

app.listen(8080, () => {
  console.log("server is Listing at Port 8080");
});
