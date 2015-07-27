'use strict';

angular.module('mean.workshops').config(['$stateProvider',
	function($stateProvider){

		$stateProvider
			.state('all workshops',{
				url: '/workshops',
				templateUrl: '/workshops/views/workshops.public.list.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('create workshop', {
				url: '/workshops/create',
				templateUrl: '/workshops/views/workshops.public.create.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('workshop by id', {
				url: '/workshops/:workshopId',
				templateUrl: '/workshops/views/workshops.public.view.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
			});
	}
]);