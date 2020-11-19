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
  colorStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  audioStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  approved: {
    type: Boolean,
    required: true,
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