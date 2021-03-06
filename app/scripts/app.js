'use strict';
/*global angular:false*/
angular
  .module('workspaceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular.filter',
    'cloudinary',
    'angularFileUpload',
	  'ngTagsInput',
	  'ui.sortable'
  ])
  .config(function ($routeProvider, $locationProvider) {
    var firstFetch = true;
    var checkLogin = function($q, $location, $http, User, Socket, Alert, Session, Team, Org) {
      var deferred = $q.defer();
      $http.get('/api/user')
      .success(function(user){
        if(user){
          if(!User.details) {
            Socket.emit('user', user);
            Alert.log('Welcome back ' + user.name);
          }
          User.details = user;
          if(firstFetch) {
            firstFetch = false;
            Session.fetchSessions();
            Team.fetchTeams();
            Org.fetchOrgs();
          }
          deferred.resolve(user);
        }
        else {
          User.details = undefined;
          deferred.reject();
          $location.path('/login');
        }
      })
      .error(function(){
        User.details = undefined;
        deferred.reject();
        $location.path('/login');
      });
      return deferred.promise;
    };
    var softLogin = function($q, $http, User, Socket, Session, Team, Org) {
      var deferred = $q.defer();
      $http.get('/api/user')
      .success(function(user){
        if(!User.details) {
          Socket.emit('user', user);
        }
        User.details = user;
        if(firstFetch) {
          firstFetch = false;
          Session.fetchSessions();
          Team.fetchTeams();
          Org.fetchOrgs();
        }
        deferred.resolve(user);
      })
      .error(function(){
        User.details = undefined;
        deferred.resolve(null);
      });
      return deferred.promise;
    };
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {loggedIn:softLogin}
      })
      .when('/login',{
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {loggedIn:softLogin}
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/org', {
        templateUrl: 'views/orgsetup.html',
        controller: 'OrgsetupCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/org/:slug/edit', {
        templateUrl: 'views/orgsetup.html',
        controller: 'OrgsetupCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/org/:slug', {
        templateUrl: 'views/org.html',
        controller: 'OrgCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/team', {
        templateUrl: 'views/teamsetup.html',
        controller: 'TeamsetupCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/team/:slug/edit', {
        templateUrl: 'views/teamsetup.html',
        controller: 'TeamsetupCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/team/:slug', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/profile/:slug?', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/session', {
        templateUrl: 'views/sessionsetup.html',
        controller: 'SessionsetupCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/session/:slug/edit', {
        templateUrl: 'views/sessionsetup.html',
        controller: 'SessionsetupCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/session/:slug', {
        templateUrl: 'views/session.html',
        controller: 'SessionCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/resource/:resourceId', {
        templateUrl: 'views/resource.html',
        controller: 'ResourceCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl',
        resolve: {loggedIn:checkLogin}
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $timeout, Session, Nav, Resource, Roster){
    $rootScope.$on('$routeChangeStart', function(){
      Session.stopChecking();
      Resource.clear();
      Roster.clear();
      Nav.subtitle = '';
      Nav.titleUrl = '';
      angular.element('body')[0].scrollTop = 0;
    });
  });
