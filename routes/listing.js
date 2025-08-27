const express = require("express");
const router = express.Router();

const { allListings, showListing ,newListing , newData, edited , editedPut, deleteListing} = require("../controllers/listing");

//listing route
router.get("/listings", allListings);
// create new listing
router.get("/listings/new", newListing);
router.post("/listings",newData );
//show route
router.get("/listings/:id", showListing);
//edit 
router.get("/listings/:id/edit", edited);
router.put("/listings/:id", editedPut);
//delete
router.delete("/listings/:id", deleteListing);


module.exports = router;
