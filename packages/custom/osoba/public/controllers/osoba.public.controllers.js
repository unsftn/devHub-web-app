'use strict';

/* jshint -W098 */
angular.module('mean.osoba').controller('OsobaController', ['$scope', '$location', 'Global', 'Osobe','$stateParams', 'Ulogaosobe',
  function($scope, $location, Global, Osobe, $stateParams, Ulogaosobe) {
    $scope.global = Global;
    $scope.package = {
      name: 'osoba'
    };

    $scope.nesto = "nestoAAA";	

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.osoba.permissions.push('test test');
        var osoba = new Osobe($scope.osoba);

        osoba.$save(function(response) {
          $location.path('osoba/lista');
          //$location.path('Osobe/' + response._id);
        }, function() {$location.path('login');});

        $scope.osoba = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(osoba) {
      if (osoba) {
        osoba.$remove(function(response) {
          for (var i in $scope.osobe) {
            if ($scope.osobe[i] === osoba) {
              $scope.osobe.splice(i, 1);
            }
          }
          $location.path('osoba/lista');
        });
      } else {
        $scope.osoba.$remove(function(response) {
          $location.path('osoba/lista');
        });
      }
    };

    $scope.update = function(isValid) {
      //alert("Izmena projekta sa nazivom: "+isValid.naziv + ". OTVORITI POPUNJENU FORMU ZA IZMENU PROJEKTA!!!");
      //return;
      if (isValid) {
        var osoba = $scope.osoba;
        if (!osoba.updated) {
          osoba.updated = [];
        }
        osoba.updated.push(new Date().getTime());

        osoba.$update(function() {
          $location.path('osoba/lista');
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      $scope.nesto = "u find() pre query";  
      
      Osobe.query(function(osobe) {
        $scope.nesto = "u find() u query!"
        $scope.osobe = osobe;
      });
    };

    $scope.findOne = function() {
      Osobe.get({
        osobaId: $stateParams.osobaId
      }, function(osoba) {
        $scope.osoba = osoba;
      });
    };

    $scope.sveUloge = function() {
      $scope.nesto = "u find() pre query";  
      
      Ulogaosobe.query(function(uloge) {
        $scope.nesto = "u find() u query!"
        $scope.uloge = uloge;
      });
    };

  }
]);
