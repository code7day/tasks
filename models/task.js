var mongoose = require('mongoose');

var Task =  mongoose.model('Task', new mongoose.Schema({
  name: String
}));

module.exports = Task;