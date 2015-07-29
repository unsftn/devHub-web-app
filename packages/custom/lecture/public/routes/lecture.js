'use strict';

angular.module('mean.lecture').config(['$stateProvider',
	function($stateProvider){

		$stateProvider
			.state('all lectures',{
				url: '/lectures',
				templateUrl: 'lecture/views/list.html'
				// Nedostaje resolve za proveru logovanja
			})
			.state('create lecture',{
				url: '/lectures/create',
				templateUrl: 'lecture/views/create.html'
			})
			.state('edit lecture',{
				url: '/lectures/:lectureId/edit',
				templateUrl: 'lecture/views/edit.html'
			})
			.state('lecture by id',{
				url: '/lectures/:lectureId',
				templateUrl: 'lecture/views/view.html'
			})
			.state('approve lecture',{
				url: '/approve/lectures',
				templeteUrl: 'lecture/views/approve.html'
			});

	}
]);
