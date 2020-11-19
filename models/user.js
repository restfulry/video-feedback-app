var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema ({
  name: String,
  email: String,
  googleID: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);