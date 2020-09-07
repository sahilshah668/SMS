const express = require("express");
const router = express.Router();
const passport = require('passport')
const authController = require('../controller/AuthController')

router.post("/login",authController.Login);

router.post("/register",authController.Register);

router.get(
  "/verify-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
