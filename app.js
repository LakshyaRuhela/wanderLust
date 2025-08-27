const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });
PORT = 3000 || process.env.PORT;
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// mounting route
const listing = require("./routes/listing");
app.use("/wanderlust", listing);
app.use("/", listing);
// default route

app.get("/", (req, res) => {
  res.send("Hi , I am Root path");
});
// db connection
const dbConnect = require("./config/database");
dbConnect();

//test Listing
app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "MY new villa",
    description: "Near the beach",
    price: 1500,
    location: "GOA",
    country: "India",
  });

  await sampleListing.save();
  console.log("sample was saved");
  res.send("Successful testing");
});
//start server
app.listen(PORT, () => {
  console.log(`Server is Listening at Port : ${PORT}`);
});
