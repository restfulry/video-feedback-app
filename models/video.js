var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  projectName: String,
  docket: Number,
  version: Number,
  colorStatus: Boolean,
  audioStatus: Boolean,
  approved: Boolean,
  url: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);