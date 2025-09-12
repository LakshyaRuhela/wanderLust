const Review = require("./models/review");
const Listing = require("./models/listing");
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
// to check owner for listing edit
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You Dont have permission to change in listings !!");
    return res.redirect(`/wanderlust/listings/${id}`);
  }
  next();
};
//to check owner for reviewe
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of the review");
    return res.redirect(`/wanderlust/listings/${id}`);
  }
  next();
};
