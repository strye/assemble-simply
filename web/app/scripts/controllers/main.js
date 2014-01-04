'use strict';

angular.module('webApp').controller('MainCtrl', function ($scope, $location, meetingService) {
    $scope.projectGoals = [
		'Show a site stored completely on S3',
		'Demonstrate logging in with facebook and AWS IAM',
		'Secured read and write with DynamoDB from the client javascript',
		'using SQS to manage application commands',
		'deploying a nodeJS application using elastic beanstalk for real-time client communications'
    ];

	$scope.meetings = [];

	$scope.loadMeetings = function() {
		getMeetings();
	};


	$scope.OpenMeeting = function(id) {
		$location.path('/meeting/' + id);
	};

	$scope.gotoS3Test = function(id) {
		$location.path('/s3test/');
	};

	$scope.testmeeting = function() {
		var meeting = {};
		meeting.id = "id";
		meeting.title = "Test Meeting Title";
		meeting.description = "Test description for adding a meeting";
		$scope.meetings.push(meeting);

		console.log($scope.meetings);
	};

	$scope.amazonLogin = function(){
		var options = { scope : 'profile' };

		amazon.Login.authorize(options, function(response) {
			if ( response.error ) { console.log('oauth error ' + response.error); }

			AWS.config.credentials = new AWS.WebIdentityCredentials({
				//RoleArn: 'arn:aws:iam::049162673837:role/assemblesimple',
				RoleArn: 'arn:aws:iam::049162673837:role/malgen-poster',
				ProviderId: 'www.amazon.com',
				WebIdentityToken: response.access_token
			});
			AWS.config.region = 'us-west-2';

			amazon.Login.retrieveProfile(response.access_token, function(profileResponse) {
				//console.log(profileResponse);
				User.name = profileResponse.profile.Name;
				User.email = profileResponse.profile.PrimaryEmail;
				console.log(User);
			});

		});
	};


	var getMeetings = function(){
		var promise = meetingService.getMeetings();
		promise.then(function(meetings) {
			$scope.meetings = meetings;
			//console.log($scope.meetings);
		}, function(reason) {
			console.log('Failed: ' + reason);
		}, function(update) {
			console.log('Got notification: ' + update);
		});

	};
});
