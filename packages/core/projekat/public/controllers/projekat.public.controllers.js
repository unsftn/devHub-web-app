'use strict';

/* jshint -W098 */
angular.module('mean.projekat').controller('ProjekatController', ['$scope', '$location', 'Global', 'Projekti','$stateParams', 'Prakse', 'Ulogaosobe',
  function($scope, $location, Global, Projekti, $stateParams, Prakse, Ulogaosobe) {
    $scope.global = Global;
    $scope.package = {
      name: 'projekat'
    };

    $scope.nesto = "nestoAAA";	

    $scope.create = function(isValid) {
      alert($scope.mentori);
      if (isValid) {
        // $scope.projekat.permissions.push('test test');
        var projekat = new Projekti($scope.projekat);

        projekat.$save(function(response) {
          $location.path('projekat/lista');
          //$location.path('Projekti/' + response._id);
        }, function() {$location.path('login');});

        $scope.projekat = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(projekat) {
      if (projekat) {
        projekat.$remove(function(response) {
          for (var i in $scope.projekti) {
            if ($scope.projekti[i] === projekat) {
              $scope.projekti.splice(i, 1);
            }
          }
          $location.path('projekat/lista');
        });
      } else {
        $scope.projekat.$remove(function(response) {
          $location.path('projekat/lista');
        });
      }
    };

    $scope.update = function(isValid) {
      //alert("Izmena projekta sa nazivom: "+isValid.naziv + ". OTVORITI POPUNJENU FORMU ZA IZMENU PROJEKTA!!!");
      //return;
      if (isValid) {
        var projekat = $scope.projekat;
        if (!projekat.updated) {
          projekat.updated = [];
        }
        projekat.updated.push(new Date().getTime());

        projekat.$update(function() {
          $location.path('projekat/lista');
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      $scope.nesto = "u find() pre query";  
      
      Projekti.query(function(projekti) {
        $scope.nesto = "u find() u query!"
        $scope.projekti = projekti;
      });
    };

    $scope.findOne = function() {
      Projekti.get({
        projekatId: $stateParams.projekatId
      }, function(projekat) {
        $scope.projekat = projekat;
        $scope.mentori = projekat.mentori;
        $scope.ucesnici = projekat.ucesnici;
      });
    };

    $scope.sveUloge = function() {
      $scope.nesto = "u find() pre query";  
      
      Ulogaosobe.query(function(uloge) {
        $scope.nesto = "u find() u query!"
        $scope.uloge = uloge;
      });
    };

    $scope.mentori=[];
    $scope.ucesnici=[];

    $scope.dodajMenUce = function(isValid) {
      if (isValid) {
        // $scope.projekat.permissions.push('test test');
        /*var projekat = new Projekti($scope.projekat);

        projekat.$save(function(response) {
          $location.path('projekat/lista');
          //$location.path('Projekti/' + response._id);
        }, function() {$location.path('login');});

        $scope.projekat = {};*/
        if ($scope.osoba.uloga=="mentor") {
          $scope.mentori.push($scope.osoba.ime+" "+$scope.osoba.prezime);  
        } else if ($scope.osoba.uloga=="ucesnik") {
          $scope.ucesnici.push($scope.osoba.ime+" "+$scope.osoba.prezime);
        }
        $scope.selected = "true";
      } else {
        $scope.submitted = true;
      }

    };

    $scope.selected = "true";

  }
]);
