const express = require('express');
const router = express.Router();
const videosCtrl = require('../controllers/videos');

router.get('/',isLoggedIn, videosCtrl.index);
router.get('/new',isLoggedIn, videosCtrl.new);
router.get('/:id', videosCtrl.show);

router.post('/', videosCtrl.create);

router.put('/:id', videosCtrl.update);
router.get('/:id/edit',isLoggedIn, videosCtrl.edit);

router.delete('/:id', videosCtrl.delete);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
};

module.exports = router;