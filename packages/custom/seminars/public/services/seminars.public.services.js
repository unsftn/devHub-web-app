'use strict';

angular.module('mean.seminars').factory('Seminars', ['$resource',
	function($resource) {
		return $resource('api/seminars/:seminarId', {
			seminarId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
