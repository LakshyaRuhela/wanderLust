const User = require("../models/user");

exports.getSignup = (req, res) => {
  res.render("users/signup.ejs");
};

exports.postSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
    });
    req.flash("success", "Welcome to WanderLust");
    res.redirect("/wanderlust/listings");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/wanderlust/signup");
  }
};

//login
exports.getLogin = (req, res) => {
  res.render("users/login.ejs");
};

exports.postLogin = async (req, res) => {
  req.flash(
    "success",
    "welcome back to WanderLust, You Logged in successfully !!"
  );
  let redirectUrl = res.locals.redirectUrl || "/wanderlust/listings";
  res.redirect(redirectUrl);
};

//logout
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "you are logout !!");
      res.redirect("/wanderlust/listings");
    }
  });
};
