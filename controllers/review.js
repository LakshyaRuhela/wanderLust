const Review = require("../models/review.js");
const Listing = require("../models/listing");

//post review
exports.addReview = async (req, res) => {
  console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review); // for single pass all parameter
  newReview.author = req.user._id; // to fetch user data for new review
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "Review added successfully !!");
  res.redirect(`/wanderlust/listings/${req.params.id}`);
};

// delete review
exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted successfully !!");
  res.redirect(`/wanderlust/listings/${req.params.id}`);
};
