/**
 * Created for assemble-simply
 * User: willstrye
 * Date: 11/24/13
 * Time: 12:04 PM
 */

angular.module('webApp').controller('MeetingCtrl', function ($scope, $routeParams, $location, agendaService) {

	$scope.MeetingId = $routeParams.meetingId;
	$scope.Agenda = [];

	$scope.leaveDemo = function(){
		$location.path('/');
	};

	$scope.currentSlide = "";
	$scope.currentTopic = null;

	$scope.setCurrentTopic = function(topic){
		var slide = topic.slide.replace(/\\n/g, "\n");

		if ($scope.currentTopic) $scope.currentTopic.Active = false;
		topic.Active = true;
		$scope.currentSlide = marked(slide);
		$scope.currentTopic = topic;
	};
	$scope.topicStyle = function(topic){
		var res = "";
		if (topic.Active) res = "active";
		return res;
	};

	var getAgenda = function(){
		var promise = agendaService.getAgenda($scope.MeetingId);
		promise.then(function(agenda) {
			$scope.Agenda = agenda;
			//console.log($scope.meetings);
		}, function(reason) {
			console.log('Failed: ' + reason);
		}, function(update) {
			console.log('Got notification: ' + update);
		});

	};

	getAgenda();
});
