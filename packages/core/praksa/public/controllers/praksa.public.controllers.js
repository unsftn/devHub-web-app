'use strict';

/* jshint -W098 */
angular.module('mean.praksa').controller('PraksaController', ['$scope', '$location', 'Global', 'Prakse','$stateParams', 'Projekti', 'Ulogaosobe',
  function($scope, $location, Global, Prakse, $stateParams, Projekti, Ulogaosobe) {
    $scope.global = Global;
    $scope.package = {
      name: 'praksa'
    };

    $scope.nesto = "nestoAAA";	

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.praksa.permissions.push('test test');
        var praksa = new Prakse($scope.praksa);

        praksa.$save(function(response) {
          $location.path('praksa/lista');
          //$location.path('Projekti/' + response._id);
        }, function() {$location.path('login');});

        $scope.praksa = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(praksa) {
      if (praksa) {
        praksa.$remove(function(response) {
          for (var i in $scope.prakse) {
            if ($scope.prakse[i] === praksa) {
              $scope.prakse.splice(i, 1);
            }
          }
          $location.path('praksa/lista');
        });
      } else {
        $scope.praksa.$remove(function(response) {
          $location.path('praksa/lista');
        });
      }
    };

    $scope.update = function(isValid) {
      //alert("Izmena projekta sa nazivom: "+isValid.naziv + ". OTVORITI POPUNJENU FORMU ZA IZMENU PROJEKTA!!!");
      //return;
      if (isValid) {
        alert("nova vrednost lokacije prakse: " + $scope.praksa.lokacija);
        var praksa = $scope.praksa;
        if (!praksa.updated) {
          praksa.updated = [];
        }
        praksa.updated.push(new Date().getTime());

        praksa.$update(function() {
          $location.path('praksa/lista');
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      $scope.nesto = "u find() pre query";  
      
      Prakse.query(function(prakse) {
        $scope.nesto = "u find() u query!"
        $scope.prakse = prakse;
      });
    };

    $scope.findOne = function() {
      Prakse.get({
        praksaId: $stateParams.praksaId
      }, function(praksa) {
        $scope.praksa = praksa;
        $scope.mentori = praksa.mentori;
        $scope.ucesnici = praksa.ucesnici;
        $scope.kandidati = praksa.kandidati;
      });
    };

    $scope.allProjects = function() {
      $scope.nesto = "u find() pre query";  
      
      Projekti.query(function(projekti) {
        $scope.nesto = "u find() u query!"
        $scope.projekti = projekti;
      });
    };

    $scope.selekcija = function(praksa, projekat) {
      $scope.nesto = "u find() pre query";  
      
      for (var i in praksa.projekti) {
      	if (praksa.projekti[i]==projekat)
      		return true;
      }
      return false;
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
    $scope.kandidati=[];

    $scope.dodajMenUceKan = function(isValid) {
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
        } else if ($scope.osoba.uloga=="kandidat") {
          $scope.kandidati.push($scope.osoba.ime+" "+$scope.osoba.prezime);
        } 
      } else {
        $scope.submitted = true;
      }

    };
  }
]);
