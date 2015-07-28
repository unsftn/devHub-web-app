'use strict';

angular.module('mean.seminars').config(['$stateProvider',
	function($stateProvider){

		$stateProvider
			.state('all seminars',{
				url: '/seminars',
				templateUrl: '/seminars/views/list.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
			.state('create seminar', {
				url: '/seminars/create',
				templateUrl: '/seminars/views/create.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
				})
		
			.state('edit seminar', {
				url: '/seminars/:seminarId/edit',
				templateUrl: '/seminars/views/edit.html',
				resolve: {
					loggedin: function(MeanUser) {
						return MeanUser.checkLoggedin();
					}
				}
			})
			//ruta za formu za prijavljivanje korisnika
			.state('application form', {
				url: '/seminars/:seminarId/apply',
				templateUrl: '/seminars/views/apply.html',
				resolve: {
					loggedin: function(MeanUser){
						return MeanUser.checkLoggedin();
					}
				}
			});
	}
]);