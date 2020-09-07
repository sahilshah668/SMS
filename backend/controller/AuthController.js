const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");


exports.Login = (req,res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          res.status(400).json({ msg: "user with this email not exist" });
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
            if (isMatch) {
              const payload = {
                id: user.id,
                name: user.name,
                branch:user.branch,
                email:user.email
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              res.status(400).json({ msg: "password not matched" });
            }
          });
        }
      });
}


exports.Register = (req,res) => {
    
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({ msg: "user with this email already exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        branch: req.body.branch,
        password: req.body.password,
      });
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          newUser.password = hash;
          newUser.save().then((user) => {
            res.status(200).json({ msg: "successfully registered" });
          });
        });
      });
    }
  });
}