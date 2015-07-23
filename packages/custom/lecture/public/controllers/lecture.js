'use strict';

/* jshint -W098 */
angular.module('mean.lecture').controller('LectureController', ['$scope', 'Global', 'Lecture',
  function($scope, Global, Lecture) {
    $scope.global = Global;
    $scope.package = {
      name: 'lecture'
    };
  }
]);
