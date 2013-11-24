'use strict';

angular.module('webApp', []).config(function ($routeProvider) {
	$routeProvider
		.when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
		.when('/meeting/:meetingId', { templateUrl: 'views/meeting.html', controller: 'MeetingCtrl' })
		.otherwise({ redirectTo: '/' });
});

