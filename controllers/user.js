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
    req.flash("success", "Welcome to WanderLust");
    res.redirect("/wanderlust/listings");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/wanderlust/signup");
  }
};
