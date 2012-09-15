var port = process.argv[2] || 3000;

var express = require('express'),
    mongoose = require('mongoose');

var app = module.exports = express();
require('./configuration')(app, express);
require('./routes')(app);

mongoose.connect("mongodb://localhost:27017/tasks");

app.listen(port);
console.log("Express server listening on port " + port);