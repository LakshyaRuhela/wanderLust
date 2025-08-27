const Listing = require("../models/listing");
//listings
exports.allListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//show route
exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error(err);
    console.log("failed");
    res.status(500).send("Something went wrong");
  }
};

// create new
exports.newListing = async (req, res) => {
  try {
    res.render("listings/new.ejs");
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: `unable to create a new listing`,
    });
  }
};

exports.newData = async (req, res) => {
  try {
    //fetch all details in {} next shown below
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/wanderlust/listings");
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: `unable to add a  new listing data`,
    });
  }
};

//edit route
exports.edited = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: `unable to edit a  listing data`,
    });
  }
};
exports.editedPut = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/wanderlust/listings/${id}`);
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: `unable to POST edited listing data`,
    });
  }
};

//delete route
exports.deleteListing = async(req, res)=>{
  try{
    const {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/wanderlust/listings");
  }
   catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: `unable to DELETE listing data`,
    });
  }
}