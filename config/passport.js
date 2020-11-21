const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {

  User.find({})
    .then(users => console.log('ALL USERS', users))
    .catch(err => console.log(err));

  User.findOne({ 'googleId': profile.id })
    .then(user => {
      // console.log('PROFILE', profile);
      if(user) {
        console.log('LOGGED IN USER', user);
        return cb(null, newUser);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save()
        .then(() => cb(null, newUser))
        .catch(err => console.log(err));
      };
    })
    .catch(err => console.log(err));
  // User.find({})
  //   .then(users => console.log('USERS',users))
  //   .then(user => {
  //     var newUser = new User({
  //       name: profile.displayName,
  //       email: profile.emails[0].value,
  //       googleId: profile.id
  //     });
  //     newUser.save(function(err) {
  //       if (err) return cb(err);
  //       return cb(null, newUser);
  //     });
  //   })
  //   .catch(err => console.log(err));

//   User.findOne({ 'googleId': profile.id }, function(err, user) {
//     console.log('PROFILE', profile);
//     if (err) return cb(err);
//     if (user) {
//       return cb(null, user);
//     } else {
//       // we have a new student via OAuth!
//     }
//   });
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});