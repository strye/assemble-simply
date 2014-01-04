'use strict';

angular.module('dynamoDb', []);


angular.module('webApp', ['ngRoute','ngSanitize','ngResource','dynamoDb']).config(function ($routeProvider) {
	$routeProvider
		.when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
		.when('/meeting/:meetingId', { templateUrl: 'views/meeting.html', controller: 'MeetingCtrl' })
		.when('/s3test/', { templateUrl: 'views/s3test.html', controller: 'S3TestCtrl' })
		.otherwise({ redirectTo: '/' });
});
