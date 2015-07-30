'use strict';

angular.module('mean.meetup').controller('MeetupsController',['$scope', '$stateParams', '$location', 'Global', 'Meetups', 'Lectures','MeanUser', 'Circles',

	function($scope, $stateParams, $location, Global, Meetups,Lectures, MeanUser, Circles){
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
    			var meetup = new Meetups($scope.meetup);
    			meetup.$save(function(response){
    				$location.path('meetups/'+response._id);
    			}
                );
    			$scope.meetup ={};

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

 				meetup.updated.push(new Date().getTime());

 				meetup.$update(function(){
 					$location.path('meetups/'+meetup._id);
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



        $scope.checkSelectedLectures = function(lectures){
            if(!$scope.meetup.lectures){
                $scope.meetup.lectures=[];
            }
            else{
                // maybe the same ^^^^^
                $scope.meetup.lectures=[];
            }
            var meetup = $scope.meetup;
            console.log("OVDEEE SAAAAAM ");
           console.log(JSON.stringify(meetup));
           console.log("Duzina niza lectures je "+lectures.length);

           for(var i=0; i<lectures.length; i++){
                 console.log("1.Usao u petlju "+lectures[i].name);
               // if(lectures[i].SELECTED=='Y'){
                 //   meetup.lectures.push(lectures[i].name);
                   // console.log(lectures[i].name);
                 //}
                if(lectures[i].selected == true){
                   meetup.lectures.push(lectures[i].name);
                    console.log(lectures[i].name); 
                }

           }

        };


        $scope.allLectures = function(){
            Lectures.query(function(lectures){
                var approvedLectures = $.grep(lectures, function(e){ return e.accepted == true; });
                $scope.lectures = approvedLectures;
            });

        };


        $scope.updatedLectures = function(meetup, lectures){
            if(!$scope.meetup.lectures){
                $scope.meetup.lectures=[];
            }
            else{
                // maybe the same ^^^^^
                $scope.meetup.lectures=[];
            }

           console.log(JSON.stringify(meetup));
           console.log("Duzina niza lectures je "+lectures.length);

           for(var i=0; i<lectures.length; i++){
                 console.log("1.Usao u petlju "+lectures[i].name);
               // if(lectures[i].SELECTED=='Y'){
                 //   meetup.lectures.push(lectures[i].name);
                   // console.log(lectures[i].name);
                 //}
                if(lectures[i].selected == true){

                   meetup.lectures.push(lectures[i].name);
                    console.log(lectures[i].name); 
                }

           }
        };



        // DATEPICKER 

         $scope.today = function() {
            $scope.dt = new Date();
        };
          
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

          // Disable weekend selection
        $scope.disabled = function(date, mode) {
           return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

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

          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          $scope.format = $scope.formats[0];

          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 2);
          $scope.events =
            [
              {
                date: tomorrow,
                status: 'full'
              },
              {
                date: afterTomorrow,
                status: 'partially'
              }
            ];

          $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                  return $scope.events[i].status;
                }
              }
            }

            return '';
          };

	}
]);
