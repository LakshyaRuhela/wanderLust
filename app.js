const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });
PORT = 3000 || process.env.PORT;
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// mounting route
const listing = require("./routes/listing");
const review = require("./routes/review");
app.use("/wanderlust", listing , review);
app.use("/", listing);
// app.use("/wanderlust/listings", review);

// db connection
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req, res) => {
  res.render("/wandrlust");
});

// 404 must before all the  Error handling route

app.use((req, res, err) => {
  res.status(400).render("error.ejs", { err });
});

// sever side error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
  //  res.status(statusCode).send(message);
});

//test Listing
// app.get("/testListing", async (req, res) => {k
//   let sampleListing = new Listing({
//     title: "MY new villa",
//     description: "Near the beach",
//     price: 1500,
//     location: "GOA",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("Successful testing");
// });

//start server
app.listen(PORT, () => {
  console.log(`Server is Listening at Port : ${PORT}`);
});
