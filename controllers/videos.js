const Video = require('../models/video');
const User = require('../models/user');
const { render } = require('../server');

function index(req, res) {
  Video.find({})
    .then(videos => {
      console.log('LOCAL', req.user);
      res.render('videos/index', {
        title: 'All Videos', 
        videos,
    })
  });
};

function newVideo(req, res) {
  res.render('videos/new', {title: 'New Video'});
};

function create(req, res) {
  const vimeoIdParse = req.body.url.split('/')[3];
  // const videoData = {...req.body, vimeoId};
  const video = new Video(req.body);
  video.vimeoId = vimeoIdParse; 
  video.save()
    .then((video) => {
      console.log('video saved', video);
      res.redirect('/videos')
    })
    .catch(err => console.log(err));
};

function show(req, res) {
  console.log("SHOW REQ.USER",req.user);
  Video.findById(req.params.id)
    .then((video) => {
      console.log('SHOW PG - Video ID', video.id);
      res.render('videos/show', { title: 'Video Detail', video });
    })
    .catch(err => console.log(err));
};

function edit(req, res) {
  Video.findById(req.params.id)
    .then(video => {res.render('videos/edit', {title: 'Edit Information', video});
    })
    .catch(err => console.log(err));
};

function update(req, res) {
  const videoId = req.params.id;
  const vimeoIdParse = req.body.url.split('/')[3];
  req.body.vimeoId = vimeoIdParse;

  Video.findByIdAndUpdate(videoId, req.body)
  .then((video) => {
    res.redirect(`/videos/${videoId}`)
    console.log('video updated', video);
  })
  .catch(err => console.log(err));
};

function deleteVideo(req, res) {
  Video.findById(req.params.id)
  .then(video => {
    video.remove()
  })
  .then(() => res.redirect('/videos'))
};

module.exports = {
  index,
  create,
  new: newVideo,
  show,
  edit,
  update,
  delete: deleteVideo,
};