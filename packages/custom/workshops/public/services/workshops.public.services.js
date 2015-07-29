'use strict';

angular.module('mean.workshops').factory('Workshops', ['$resource',
	function($resource) {
		return $resource('api/workshops/:workshopId', {
			workshopId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
