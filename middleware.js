module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //for redirect of url after login

    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create New Listing");
    return res.redirect("/wanderlust/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
