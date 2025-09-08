const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { getSignup , postSignup } = require("../controllers/user");

router.get("/signup", getSignup);
router.post("/signup", wrapAsync(postSignup));

module.exports = router;
