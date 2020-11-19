const express = require('express');
const router = express.Router();
const videosCtrl = require('../controllers/videos');

router.get('/', videosCtrl.index);
router.get('/new', videosCtrl.new);
router.get('/:id', videosCtrl.show);
router.post('/', videosCtrl.create);



module.exports = router;