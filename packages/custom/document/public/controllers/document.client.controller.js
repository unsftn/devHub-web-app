'use strict';

angular.module('mean.document').controller('DocumentController', ['$scope', '$stateParams', '$location', 'Global', 'Document', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Document, MeanUser) {
    $scope.global = Global;
    /*
    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return MeanUser.isAdmin || article.user._id === MeanUser.user._id;
    };

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
    */
    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.article.permissions.push('test test');
        var document = new Document($scope.tag);

        document.$save(function(response) {
          $location.path('documents/' + response._id);
        });

        $scope.document = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(document) {
      if (document) {
        document.$remove(function(response) {
          for (var i in $scope.documents) {
            if ($scope.documents[i] === document) {
              $scope.documents.splice(i, 1);
            }
          }
          $location.path('documents');
        });
      } else {
        $scope.document.$remove(function(response) {
          $location.path('documents');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var document = $scope.document;
        if (!document.updated) {
          document.updated = [];
        }
        document.updated.push(new Date().getTime());

        document.$update(function() {
          $location.path('documents/' + document._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Document.query(function(documents) {
        $scope.documents = documents;
      });
    };

    $scope.findOne = function() {
      Document.get({
        tagId: $stateParams.documentId
      }, function(document) {
        $scope.document = document;
      });
    };
  }
]);