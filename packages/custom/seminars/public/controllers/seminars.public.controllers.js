'use strict';

angular.module('mean.seminars').controller('SeminarsController', ['$scope', '$stateParams', '$location', 'Global', 'Seminars','Workshops',
		function($scope, $stateParams, $location, Global, Seminars, Workshops) {
			
			$scope.global = Global;

      $scope.today=new Date();

			 $scope.create = function(isValid) {
    			  if (isValid) {
     		   
     			  var seminar = new Seminars($scope.seminar);

      			  seminar.$save(function(response) {
       			    //  $location.path('seminars/' + response._id);
                $location.path('seminars');
      			  }, function() {$location.path('login');});

      			  $scope.seminar = {};

      			  } else {
       				 $scope.submitted = true;
      			}
    		};
		

			$scope.remove = function(seminar){
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
       				   $location.path('seminars');
      				});
     			  } else {
     				   $scope.submitted = true;
     			}
			};

			$scope.find = function() {
     			 Seminars.query(function(seminars) {
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

      $scope.workshops = function() {
          Workshops.query(function(workshops){
            $scope.workshops = workshops;
          });
      };  
	}

]);
