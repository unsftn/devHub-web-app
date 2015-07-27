'use strict';

angular.module('mean.tags').controller('TagsController', ['$scope', '$stateParams', '$location', 'Global', 'Tags', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Tags, MeanUser) {
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
        var tag = new Tags($scope.tag);

        tag.$save(function(response) {
          $location.path('tags/' + response._id);
        });

        $scope.tag = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(tag) {
      if (tag) {
        tag.$remove(function(response) {
          for (var i in $scope.tags) {
            if ($scope.tags[i] === tag) {
              $scope.tags.splice(i, 1);
            }
          }
          $location.path('tags');
        });
      } else {
        $scope.tag.$remove(function(response) {
          $location.path('tags');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var tag = $scope.tag;
        if (!tag.updated) {
          tag.updated = [];
        }
        tag.updated.push(new Date().getTime());

        tag.$update(function() {
          $location.path('tags/' + tag._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Tags.query(function(tags) {
        $scope.tags = tags;
      });
    };

    $scope.findOne = function() {
      Tags.get({
        tagId: $stateParams.tagId
      }, function(tag) {
        $scope.tag = tag;
      });
    };
  }
]);