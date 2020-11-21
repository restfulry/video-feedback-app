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
  const vimeoId = req.body.url.split('/')[3];
  const videoData = {...req.body, vimeoId};
  const video = new Video(videoData);

  video.save()
    .then(() => {
      console.log('VIDEO', video);
      res.redirect('/videos')
    })
    .catch(err => console.log(err));
};

function show(req, res) {
  Video.findById(req.params.id)
    .then((video) => {  console.log('Show Video', video);
      res.render('videos/show', { title: 'Video Detail', video });
    })
    .catch(err => console.log(err));
};

module.exports = {
  index,
  create,
  new: newVideo,
  show
};