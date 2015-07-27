'use strict';

angular.module('mean.workshops').factory('Workshops', ['$resource',
	function($resource) {
		return $resource('api/workshops/:workshopId', {
			seminarId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
