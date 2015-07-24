'use strict';

angular.module('mean.meetup').config(['$stateProvider',
	function($stateProvider){

		$stateProvider
			.state('all meetups',{
				url: '/meetups',
				templateUrl: 'meetup/views/list.html'
				// Nedostaje resolve za proveru logovanja
			})
			.state('create meetup',{
				url: '/meetups/create',
				templateUrl: 'meetup/views/create.html'
			})
			.state('edit meetup',{
				url: '/meetup/:meetupId/edit',
				templateUrl: 'meetup/views/edit.html'
			})
			.state('meetup by id',{
				url: '/meetups/:meetupId',
				templateUrl: 'meetup/views/view.html'
			});

	}
]);
