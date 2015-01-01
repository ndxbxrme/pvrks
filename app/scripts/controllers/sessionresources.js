'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .controller('SessionresourcesCtrl', function ($scope, Resource, Session, Nav) {
    Resource.currentType = 'session';
    Resource.currentId = Session.getSession()._id;
    Resource.orgId = Session.getSession().org;
    Resource.fetchResources({session:Session.getSession()._id}, 'session');
    Nav.canLibrary = true;
  });
