var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema(
  {
    email: {type: String, required: true},
  }
);

//Export model
module.exports = mongoose.model('Email', EmailSchema);
