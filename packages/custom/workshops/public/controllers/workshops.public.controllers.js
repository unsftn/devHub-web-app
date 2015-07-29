'use strict';

angular.module('mean.workshops').controller('WorkshopsController', ['$scope', '$stateParams', '$location', 'Global', 'Workshops',
		function($scope, $stateParams, $location, Global, Workshops) {
			
			$scope.global = Global;

      $scope.today=new Date();

			 $scope.create = function(isValid) {
    			  if (isValid) {
     		   
     			  var workshop = new Workshops($scope.workshop);

      			  workshop.$save(function(response) {
       			      $location.path('workshops');
      			  }, function() {$location.path('login');});

      			  $scope.workshop = {};

      			  } else {
       				 $scope.submitted = true;
      			}
    		};
		

			$scope.remove = function(workshop){
				if (workshop) {
       				 workshop.$remove(function(response) {
       				   for (var i in $scope.workshops) {
           				 if ($scope.workshops[i] === workshop) {
          				    $scope.workshops.splice(i, 1);
          				  }
          				}
        				  $location.path('workshops');
       				 });
     			} else {
     				   	$scope.workshop.$remove(function(response) {
      			  		$location.path('workshops');
      		  			});
     			}
			};

			$scope.update = function(isValid){
				 if (isValid) {
     			    var workshop = $scope.workshop;
      			  	if (!workshop.updated) {
      			   	 workshop.updated = [];
      			  	}
      			  	workshop.updated.push(new Date().getTime());

       				workshop.$update(function() {
       				   $location.path('workshops');
      				});
     			  } else {
     				   $scope.submitted = true;
     			}
			};

			$scope.find = function() {
     			 Workshops.query(function(workshops) {
      			  $scope.workshops = workshops;
     			 });
  			};

			$scope.findOne = function() {
				Workshops.get({
					workshopId: $stateParams.workshopId
				}, function(workshop) {
					$scope.workshop = workshop;
				});
			};
	
      $scope.myVar=true;
    
      $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
      }

      

      //podesavanje datuma
      $scope.today = function() {
          $scope.dt = new Date();
      };
      $scope.today();

      $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
 
      $scope.format = 'dd.MM.yyyy';

      //checking if array is empty
      $scope.isEmpty = function(array){
        if (array.length != 0) 
          return true;
        return false;
      };

    /*  $scope.technology=[];

      $scope.addTech = function(){
        alert($scope.technology);
          $scope.technology.push($scope.workshop.technology);
      }*/

    $scope.splity= function(array){
        $scope.rez = array.split(',');
        return $scope.rez;
    }
}
]);
