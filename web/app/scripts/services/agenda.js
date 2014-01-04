/**
 * Created for assemble-simply
 * User: willstrye
 * Date: 11/28/13
 * Time: 3:48 PM
 */

angular.module('dynamoDb').factory('agendaService', function ($q) {
	return {
		getAgenda: function(meetingId) {
			var deferred = $q.defer();

			// Get the meeting list.
			var conditions = { "MeetingID" : { "AttributeValueList": [{ "S": meetingId }], "ComparisonOperator": "EQ"}};
			var params = {'TableName': 'MeetingAgenda', 'KeyConditions': conditions};

			//var table = new AWS.DynamoDB({params: {'TableName': 'meetings'}});
			var dynamoDb = new AWS.DynamoDB();

			//deferred.notify("Making Call");
			dynamoDb.query(params,function(err, data) {
				var agenda = [];

				if (err) {
					console.log(err);
					deferred.reject(err);
				}

				//console.log(data); // print the item data
				//deferred.notify("Call Returned");
				angular.forEach(data.Items, function(item, key){
					//console.log(item.Slide);
					var topic = {};
					topic.meetingId = item.MeetingID.S;
					topic.topic = item.AgendaID.S;
					topic.description = item.Description.S;
					topic.ordinal = item.Ordinal.N;
					topic.slide = item.Slide.S;

					this.push(topic);
				}, agenda);

				//deferred.notify(meetings);
				//console.log(meetings);
				deferred.resolve(agenda);
				//deferred.notify("Service Resolved");
			});

			return deferred.promise;

		}
	};


});