'use strict';
/*global angular:false*/
angular.module('workspaceApp')
  .factory('Nav', function () {
    var pageTitle;
    var titleUrl;
    var color;
    var subtitle;
    var canIdea;
    var canLibrary;
    var canInvite;
    var inviteName;
    return {
      pageTitle: pageTitle,
      titleUrl: titleUrl,
      color: color,
      subtitle: subtitle,
      canIdea: canIdea,
      canLibrary: canLibrary,
      canInvite: canInvite,
      inviteName: inviteName
    };
  });
