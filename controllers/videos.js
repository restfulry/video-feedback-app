const Video = require('../models/video');
const { render } = require('../server');

function index(req, res) {
  Video.find({})
    .then(videos => {console.log(videos);
      res.render('videos/index', {title: 'All Videos', videos})});
};

function newVideo(req, res) {
  res.render('videos/new');
};

function create(req, res) {
  const video = new Video(req.body);
  video.save(function(err) {
    if(err) {
      return console.log(err);
    };
    console.log('VIDEO', video);
    res.redirect(`/videos`);
  });
};

function show(req, res) {
  // Video.findById(req.params.id)
  // .then((err, video) => {  console.log('Show Video', video);
  // res.render('videos/show', { title: 'Video', video });
  //   });
  Video.findById(req.params.id, function(err, video) {
    console.log('Show Video', video);
    res.render('videos/show', { title: 'Video Detail', video});
  });
};

module.exports = {
  index,
  create,
  new: newVideo,
  show
};