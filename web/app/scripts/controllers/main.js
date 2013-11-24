'use strict';

angular.module('webApp').controller('MainCtrl', function ($scope) {
    $scope.projectGoals = [
		'Show a site stored completely on S3',
		'Demonstrate logging in with facebook and AWS IAM',
		'Secured read and write with DynamoDB from the client javascript',
		'using SQS to manage application commands',
		'deploying a nodeJS application using elastic beanstock for realtime client communications'
    ];

	$scope.enterDemo = function(){

	};
});
