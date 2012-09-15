var Task = require('../../models/task');

module.exports = {
  index: function(req, res) {
    Task.find(function(err, tasks) {
      if (err) { console.log(err); }
      else { res.json(tasks); }
    });
   },

  show: function(req, res) {
    Task.findOne({name: req.params.id}, function(err, task) {
      if (task) { res.json(task); }
      else { res.send(404); }
    });
  },

  create: function(req, res) {
    var values = req.body.task;
    var task = new Task({ name: values.name });
    
    task.save(function(err) {
      if (err) { console.log(err); }      
      res.json(task);
    });
    
  },

  update: function(req, res) {
    var values = req.body.task;
    Task.findOneAndUpdate({name: req.params.id}, values, function(err, task) {
      res.json(task);
    });
    
  },

  destroy: function(req, res) {
    Task.findOne({name: req.params.id}, function(err, task) {
      if (task) {
        task.remove();
        res.send(200, "");
      }
      else { res.send(404); }
    });
  }
};