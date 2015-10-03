'use strict';

angular
  .module('kanbanApp', [
    'as.sortable',
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ui.router'
  ])
  .config(function ($urlRouterProvider,$stateProvider) {

    $urlRouterProvider.otherwise("/kanban");
    $stateProvider
    .state('home', {
      url: "/kanban",
      templateUrl: "views/kanban.html",
      controller: 'KanbanCtrl'
    });
    
  });

