var App = Em.Application.create({
  name: "Tasks"
});

App.store = DS.Store.create({
  revision: 4,
  adapter: DS.RESTAdapter.create({ bulkCommit: true, namespace: 'api' })
});

App.ApplicationController = Ember.Controller.extend({});
App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

App.homeController =  Ember.Controller.create();
App.HomeView = Ember.View.extend({
  templateName: 'home'
});

App.Task = DS.Model.extend({
  name: DS.attr('string'),
  primaryKey: '_id'
});

App.tasksController = Ember.ArrayController.create({
  content: [],
  cache: [],
  
  getData: function() {
    var data = App.store.findAll(App.Task);
    this.set('cache', data);
    this.set('content', data);
  },
  
  filter: function(str) {
    var cache = this.get('cache');

    if (str == "") {
      this.set('content', cache);
      return;
    }
    
    var content = cache.filter(function(task) {
      if (task.get('name').indexOf(str) != -1) { return true;
      } else { return false; }
    });
    

    this.set('content', content);
  }
});

App.TasksView = Ember.View.extend({
  templateName: 'tasks'
});

App.TasksSearchView = Ember.TextField.extend({
  keyUp: function(event) {
    App.tasksController.filter(this.get('value'));
  }
});

App.TaskView = Ember.View.extend({});

App.Router = Ember.Router.extend({
  homeController: App.homeController,
  root: Ember.Route.extend({
    doHome: function(router, event) {
      router.transitionTo('home');
    },
    doTasks: function(router, event) {
      router.transitionTo('tasks');
    },
    
    // routes
    home: Ember.Route.extend({
      route: '/',
      
      connectOutlets: function(router, context) {
        router.get('applicationController').connectOutlet('home');
      }
    }),
    tasks: Ember.Route.extend({
      route: '/tasks',
      connectOutlets: function(router, context) {
        App.tasksController.getData();
        router.get('applicationController').connectOutlet('tasks');
      },

      index: Ember.Route.extend({
        route: '/'
      }),
      task: Ember.Route.extend({
        route: '/:task_id'
      })
    })    
  })
});

$(function() {
  App.initialize();
});