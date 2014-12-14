'use strict';
/*global angular:false*/
/**
 * @ngdoc overview
 * @name workspaceApp
 * @description
 * # workspaceApp
 *
 * Main module of the application.
 */
angular
  .module('workspaceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    var checkLogin = function($q, $location, $http, User) {
      var deferred = $q.defer();
      $http.get('/api/user')
      .success(function(user){
        if(user){
          User.details = user;
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
    var softLogin = function($q, $http, User) {
      var deferred = $q.defer();
      $http.get('/api/user')
      .success(function(user){
        User.details = user;
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
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  });
