const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js");

//listings
exports.allListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//show routekk
exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
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
