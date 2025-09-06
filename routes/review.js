const express = require("express");
const router = express.Router();

const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema.js");
const { addReview, deleteReview } = require("../controllers/review.js");
const wrapAsync = require("../utils/wrapAsync");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// add review
router.post("/listings/:id/reviews", validateReview, wrapAsync(addReview));
//delete review route
router.delete("/listings/:id/reviews/:reviewId", wrapAsync(deleteReview));

module.exports = router;
