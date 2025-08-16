const User = require("../models/user");

module.exports.SignupForm = async (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.Signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let user = new User({
      username,
      email,
    });
    let registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wonderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.LoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.Login = async (req, res) => {
  req.flash("success", "welcome back to wonderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.Logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("seccess", "logged You Out!");
    res.redirect("/listings");
  });
};
