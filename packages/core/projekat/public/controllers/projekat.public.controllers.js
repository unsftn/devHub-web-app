'use strict';

/* jshint -W098 */
angular.module('mean.projekat').controller('ProjekatController', ['$scope', '$location', 'Global', 'Projekti',
  function($scope, $location, Global, Projekti) {
    $scope.global = Global;
    $scope.package = {
      name: 'projekat'
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.product.permissions.push('test test');
        var product = new Products($scope.product);

        product.$save(function(response) {
          $location.path('products/' + response._id);
        }, function() {$location.path('login');});

        $scope.product = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(product) {
      if (product) {
        product.$remove(function(response) {
          for (var i in $scope.products) {
            if ($scope.products[i] === product) {
              $scope.products.splice(i, 1);
            }
          }
          $location.path('products');
        });
      } else {
        $scope.product.$remove(function(response) {
          $location.path('products');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var product = $scope.product;
        if (!product.updated) {
          product.updated = [];
        }
        product.updated.push(new Date().getTime());

        product.$update(function() {
          $location.path('products/' + product._id);
        });
      } else {
        $scope.submitted = true;
      }
    };
  }
]);
