const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ quiet: true });
}
PORT = 3000 || process.env.PORT;
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const options = {
  secret: "Khumshi",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(options));
app.use(flash());

//must be after session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student1@gmail.com",
//     username: "yrrrr",
//   });
//   let registeredUser = await User.register(fakeUser, "ILOVEYOU");
//   res.send(registeredUser);
// });

// mounting route
const listingRoute = require("./routes/listing");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
app.use("/wanderlust", listingRoute, reviewRoute, userRoute);
app.use("/", listingRoute);
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
