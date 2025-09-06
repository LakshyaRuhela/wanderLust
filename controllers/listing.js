const Listing = require("../models/listing");
// const ExpressError = require("../utils/ExpressError"); .//
// const { listingSchema } = require("../schema.js"); // in routes

const Review = require("../models/review.js");

//listings
exports.allListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//show route ke
exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/show.ejs", { listing });
};

// create new
exports.newListing = async (req, res) => {
  res.render("listings/new.ejs");
};

exports.newData = async (req, res, next) => {
  //fetch all details in {} next shown below
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  console.log(newListing);
  res.redirect("/wanderlust/listings");
};

//edit route
exports.edited = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};
exports.editedPut = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/wanderlust/listings/${id}`);
};

//delete route
exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/wanderlust/listings");
};

// review  POST
exports.addReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review); // for single pass all parameter
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/wanderlust/listings/${req.params.id}`);
};

// delete review
exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/wanderlust/listings/${req.params.id}`);
};
