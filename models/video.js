var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema ({
  timecode: String,
  content: {
    type: String,
    required: true
  },
  user: String,
}, {
  timestamps: true
});

var videoSchema = new Schema ({
  projectName: {
    type: String,
    required: true
  },
  docket: {
    type: Number,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  colourStatus: {
    type: Boolean,
    default: false,
  },
  audioStatus: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    required: true
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);