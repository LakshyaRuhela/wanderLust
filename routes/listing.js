const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner } = require("../middleware");

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

// Can be simply shifted into middlewares
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
router.get("/listings/new", isLoggedIn, wrapAsync(newListing));
router.post("/listings", isLoggedIn, validateSchema, wrapAsync(newData));
//show route
router.get("/listings/:id", wrapAsync(showListing));
//edit
router.get("/listings/:id/edit", isLoggedIn, isOwner, wrapAsync(edited));
router.put(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  validateSchema,
  wrapAsync(editedPut)
);
//delete
router.delete("/listings/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
