const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
} = require("../controllers/user");
const { saveRedirectUrl } = require("../middleware");

//signup
router.get("/signup", getSignup);
router.post("/signup", wrapAsync(postSignup));
//login
router.get("/login", getLogin);
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/wanderlust/login",
    failureFlash: true,
  }),
  wrapAsync(postLogin)
);

//logout
router.get("/logout", logout);

module.exports = router;
