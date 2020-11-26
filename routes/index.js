var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res) {
  res.render('index')
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/videos',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) {
    res.redirect('/videos');
  } else {
    res.render('index');
  }
};

module.exports = router;
