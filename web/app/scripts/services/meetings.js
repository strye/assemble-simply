/**
 * Created for assemble-simply
 * User: willstrye
 * Date: 11/28/13
 * Time: 2:13 PM
 */

angular.module('dynamoDb').factory('meetingService', function ($q) {
	return {
		getMeetings: function() {
			var deferred = $q.defer();

			// Get the meeting list.
			var params = {'TableName': 'Meetings', 'Limit': 20};
			//var table = new AWS.DynamoDB({params: {'TableName': 'meetings'}});
			var dynamoDb = new AWS.DynamoDB();

			//deferred.notify("Making Call");
			dynamoDb.scan(params,function(err, data) {
				var meetings = [];

				if (err) {
					console.log(err);
					deferred.reject(err);
				}

				//console.log(data); // print the item data
				//deferred.notify("Call Returned");
				angular.forEach(data.Items, function(item, key){
					//console.log(item.Description);
					var meeting = {};
					meeting.id = item.Meeting.S;
					meeting.description = item.Description.S;
					meeting.start = new Date(item.Start.S);
					meeting.end = new Date(item.End.S);
					this.push(meeting);
				}, meetings);

				//deferred.notify(meetings);
				//console.log(meetings);
				deferred.resolve(meetings);
				//deferred.notify("Service Resolved");
			});

			return deferred.promise;

		}
	};


});