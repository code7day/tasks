module.exports = {
  index: function(req, res) {
     var tasks = [];

     res.json(tasks);
   },

  show: function(req, res) {
    var task = {action: 'show', id: req.params.id};
    
     res.json(task);
  },

  create: function(req, res) {
    var task = {action: 'create'};
    res.json(task);
  },

  update: function(req, res) {
    var task = {action: 'update', id: req.params.id};
    res.json(task);
  },

  destroy: function(req, res) {
    res.json({action: 'destroy', id: req.params.id});
  }
};