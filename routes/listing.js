const express = require("express");
const router = express.Router();

const { allListings, showListing ,newListing , newData} = require("../controllers/listing");

//listing route
router.get("/listings", allListings);
// create new listing
router.get("/listings/new", newListing);
router.post("/listings",newData );
//show route
router.get("/listings/:id", showListing);


module.exports = router;
