'use strict';

angular.module('mean.seminars').config(['$stateProvider',
	function($stateProvider){

		$stateProvider
			.state('all seminars',{
				url: '/seminars',
				templateUrl: '/seminars/views/seminars.public.list.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('create seminar', {
				url: '/seminars/create',
				templateUrl: '/seminars/views/seminars.public.create.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('seminar by id', {
				url: '/seminars/:seminarId',
				templateUrl: '/seminars/views/seminars.public.view.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
			})
			.state('edit seminar', {
				url: '/seminars/:seminarId/edit',
				templateUrl: '/seminars/views/seminars.public.edit.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
			})
			.state('application form', {
				url: '/seminars/apply',
				templateUrl: '/seminars/views/seminars.public.apply.html',
				resolve: {
					loggedin: function(MeanUser){
						return MeanUser.checkLoggedin();
					}
				}
			});
	}
]);