const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });
const initData = require("../init/data");
const Listing = require("../models/listing");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connection Successful ");
    })
    .catch((err) => {
      console.log("Issue in Db");
      console.error(err.message);
      process.exit(1);
    });
};

// to initiate the db
const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();

module.exports = dbConnect;
