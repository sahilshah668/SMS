const jwt = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;
const User = require("../models/Users");


const opts = {};
opts.jwtFromRequest = Extract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(
    new jwt(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};