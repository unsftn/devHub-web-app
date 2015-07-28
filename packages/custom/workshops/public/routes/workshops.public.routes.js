'use strict';

angular.module('mean.workshops').config(['$stateProvider',
	function($stateProvider){

		$stateProvider
			.state('all workshops',{
				url: '/workshops',
				templateUrl: '/workshops/views/list.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('create workshop', {
				url: '/workshops/create',
				templateUrl: '/workshops/views/create.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('edit workshop', {
				url: '/workshops/:workshopId/edit',
				templateUrl: '/workshops/views/edit.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
			});
	}
]);