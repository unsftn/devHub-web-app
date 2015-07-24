'use strict';

angular.module('mean.lecture').controller('LecturesController',['$scope', '$stateParams', '$location', 'Global', 'Lectures', 'MeanUser', 'Circles',

	function($scope, $stateParams, $location, Global, Lectures, MeanUser, Circles){
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
    			var lecture = new Lectures($scope.lecture);
    			lecture.$save(function(response){
    				$location.path('lectures/'+response._id);
    			}
                );
    			$scope.lecture ={};

    		}else{
    			$scope.submitted = true;
    		}

    	};


    	$scope.remove = function(lecture){
    		if(lecture){
    		  lecture.$remove(function(response){
    				for(var i in $scope.lectures){
    					if($scope.lectures[i] == lecture){
    						$scope.lectures.splice(i,1);
    					}
    				}
    				$location.path('lectures');
    			});
    		}
    		else{
    			lecture.$remove(function(response){
    				$location.path('lectures');
    			});
    		}
    	};



    	$scope.update = function(isValid){
 			if(isValid){
 				var lecture = $scope.lecture;
 				if(!lecture.updated){
 					lecture.updated=[];
 				}

 				lecture.updated.push(new Date().getTime());

 				lecture.$update(function(){
 					$location.path('lectures/'+lecture._id);
 				});

 			}
 			else{
 				$scope.submitted = true;
 			}
    	};

    	$scope.find = function(){
    		Lectures.query(function(lectures){
    			$scope.lectures = lectures;
    		});

    	};

    	$scope.findOne = function(){
    		Lectures.get({
    			lectureId: $stateParams.lectureId
    		},function(lecture){
    			$scope.lecture = lecture;
    		});

    	};

	}
]);