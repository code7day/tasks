module.exports = function(app) {
  var tasks = require('./tasks');

  app.get('/api/tasks', tasks.index);
  app.get('/api/tasks/:id', tasks.show);
  app.post('/api/tasks', tasks.create);
  app.put('/api/tasks/:id', tasks.update);
  app.delete('/api/tasks/:id', tasks.destroy);  
};
