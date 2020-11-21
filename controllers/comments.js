const Video = require('../models/video');

function create(req, res) {
  const comment = req.body;
  const videoId = req.params.id;
  console.log("COMMENT", comment);

  Video.findById(videoId)
    .then(video => {
      video.comments.push(comment);
      video.save();
      console.log("SAVED VIDEO", video);
    })
    .then(() => res.redirect(`/videos/${videoId}`))
    .catch(err => console.log(err));
};

module.exports = {
  create,
};