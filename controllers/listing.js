const Listing = require("../models/listing");

// const ExpressError = require("../utils/ExpressError"); .//
// const { listingSchema } = require("../schema.js"); // in routes

//listings
exports.allListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//show route ke
exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not existed");
    res.redirect("/wanderlust/listings");
    return;
  }
  //console.log(listing);
  res.render("listings/show.ejs", { listing });
};

// create new
exports.newListing = async (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

exports.newData = async (req, res, next) => {
  //fetch all details in {} next shown below
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // adding owner in Show.ejs
  await newListing.save();
  console.log(newListing);
  req.flash("success", "New Listing created successfully !!");
  res.redirect("/wanderlust/listings");
};

//edit route
exports.edited = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you required does not exists !!");
    res.redirect("/wanderlust/listings");
    return;
  }
  res.render("listings/edit.ejs", { listing });
};
exports.editedPut = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated successfully !!");
  res.redirect(`/wanderlust/listings/${id}`);
};

//delete route
exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted successfully !!");
  res.redirect("/wanderlust/listings");
};
