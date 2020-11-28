const Video = require('../models/video');

function create(req, res) {
  const comment = req.body;
  const videoId = req.params.id;
  
  const timeCode = parseInt(comment.timecode);
  const timecodeMin = Math.floor((timeCode/24) % 60);
  const timecodeSec = Math.floor((timeCode/24));
  
  comment.user = res.locals.user.name;
  comment.timecode = timeCode;
  comment.timecodeMinute = timecodeMin;
  comment.timecodeSecond = timecodeSec;
  
  Video.findById(videoId)
  .then(video => {
    console.log('COMMENT', comment);

      video.comments.push(comment);
      video.save();
      console.log("SAVED COMMENT");
    })
    .then(() => res.redirect(`/videos/${videoId}`))
    .catch(err => console.log(err));
};

module.exports = {
  create,
};