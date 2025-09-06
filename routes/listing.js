const express = require("express");
const router = express.Router();

// joi
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");

const {
  allListings,
  showListing,
  newListing,
  newData,
  edited,
  editedPut,
  deleteListing,
 
} = require("../controllers/listing");

const validateSchema = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); // validate using joi
  console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};




//listing route
router.get("/listings", wrapAsync(allListings));
// create new listing
router.get("/listings/new", wrapAsync(newListing));
router.post("/listings", validateSchema, wrapAsync(newData));
//show route
router.get("/listings/:id", wrapAsync(showListing));
//edit
router.get("/listings/:id/edit", wrapAsync(edited));
router.put("/listings/:id", validateSchema, wrapAsync(editedPut));
//delete
router.delete("/listings/:id", wrapAsync(deleteListing));
 

module.exports = router;
