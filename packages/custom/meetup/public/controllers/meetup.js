'use strict';

angular.module('mean.meetups').controller('MeetupsController',['$scope', '$stateParams', '$location', 'Global', 'Meetups', 'MeanUser', 'Circles'

	function($scope, $stateParams, $location, Global, Meetups, MeanUser, Circles){
		$scope.global = Global;

		//$scope.hasAuthorization = funtion(article){
		//	if(!recipe || !recipe.user)
		//}

		$scope.availableCircles = [];

   		Circles.mine(function(acl) {
        	$scope.availableCircles = acl.allowed;
        	$scope.allDescendants = acl.descendants;
    	});


   		$scope.showDescendants = function(permission) {
        	var temp = $('.ui-select-container .btn-primary').text().split(' ');
        	temp.shift(); //remove close icon
        	var selected = temp.join(' ');
        	$scope.descendants = $scope.allDescendants[selected];
    	};

    	$scope.selectPermission = function() {
       		$scope.descendants = [];
    	};


    	$scope.create = function(isValid){
    		if(isValid){
    			var meetup = new Meetup($scope.meetup);
    			meetup.$save(function(response)){
    				$location.path('meetups/'+response._id);
    			}
    			$scope.recipe ={};	

    		}else{
    			$scope.submitted = true;
    		}

    	};


    	$scope.remove = function(meetup){
    		if(meetup){
    			meetup.$remove(function(response){
    				for(var i in $scope.meetups){
    					if($scope.meetups[i] == meetup){
    						$scope.meetups.splice(i,1);
    					}
    				}
    				$location.path('meetups');
    			});
    		}
    		else{
    			meetup.$remove(function(response){
    				$location.path('meetups');
    			});
    		}
    	};



    	$scope.update = function(isValid){
 			if(isValid){
 				var meetup = $scope.meetup;
 				if(!meetup.updated){
 					meetup.updated=[];
 				}

 				meetup.updated.push(new Date().getTime();

 				meetup.$update(function(){
 					$location.path('meetup/'+meetup._id);
 				});

 			}
 			else{
 				$scope.submitted = true;
 			}
    	};

    	$scope.find = function(){
    		Meetups.query(function(meetups){
    			$scope.meetups = meetups;
    		});

    	};

    	$scope.findOne = function(){
    		Meetups.get({
    			meetupId: $stateParams.meetupId
    		},function(meetup){
    			$scope.meetup = meetup;
    		});

    	};

	};
]);