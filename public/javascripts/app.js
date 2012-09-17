var App = Em.Application.create({
  name: "Tasks"
});

App.store = DS.Store.create({
  revision: 4,
  adapter: DS.RESTAdapter.create({ bulkCommit: true, namespace: 'api' })
});

App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

App.HomeController =  Ember.Controller.extend();
App.HomeView = Ember.View.extend({
  templateName: 'home'
});

App.Task = DS.Model.extend({
  name: DS.attr('string'),
  primaryKey: '_id'
});

App.TasksController = Ember.ArrayController.extend({
  init: function () {
    this._super();
    this.set('content', App.store.findAll(App.Task)); 
  }
});

App.TasksView = Ember.View.extend({
  templateName: 'tasks'
});


App.Router = Ember.Router.extend({
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
        router.get('homeController').connectOutlet('tasks');
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