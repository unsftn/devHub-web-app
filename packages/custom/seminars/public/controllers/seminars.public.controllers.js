'use strict';

angular.module('mean.seminars').controller('SeminarsController', ['$scope', '$stateParams', '$location', 'Global', 'Seminars',
		function($scope, $stateParams, $location, Global, Seminars) {
			
			$scope.global = Global;

			 $scope.create = function(isValid) {
    			  if (isValid) {
     		   
     			  var seminar = new Seminars($scope.seminar);

      			  seminar.$save(function(response) {
       			      $location.path('seminars/' + response._id);
      			  }, function() {$location.path('login');});

      			  $scope.seminar = {};

      			  } else {
       				 $scope.submitted = true;
      			}
    		};
		

			$scope.remove = function(){
				if (seminar) {
       				 seminar.$remove(function(response) {
       				   for (var i in $scope.seminars) {
           				 if ($scope.seminars[i] === seminar) {
          				    $scope.seminars.splice(i, 1);
          				  }
          				}
        				  $location.path('seminars');
       				 });
     			} else {
     				   	$scope.seminar.$remove(function(response) {
      			  		$location.path('seminars');
      		  			});
     			}
			};

			$scope.update = function(isValid){
				 if (isValid) {
     			    var seminar = $scope.seminar;
      			  	if (!seminar.updated) {
      			   	 seminar.updated = [];
      			  	}
      			  	seminar.updated.push(new Date().getTime());

       				seminar.$update(function() {
       				   $location.path('seminars/' + seminar._id);
      				});
     			  } else {
     				   $scope.submitted = true;
     			}
			};

			$scope.find = function() {
				 $scope.nesto="pre";
     			 Seminars.query(function(seminars) {
     			 console.log("!!!!! "+JSON.stringify(seminars));
     			 $scope.nesto1="posle";
      			  $scope.seminars = seminars;
     			 });
  			};

			$scope.findOne = function() {
				Seminars.get({
					seminarId: $stateParams.seminarId
				}, function(seminar) {
					$scope.seminar = seminar;
				});
			};
	}

]);
