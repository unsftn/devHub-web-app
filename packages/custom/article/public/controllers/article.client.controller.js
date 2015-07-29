'use strict';

angular.module('mean.article').controller('ArticleController', ['$scope', '$stateParams', '$location', 'Global', 'Article','Files', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Article,Files, MeanUser) {
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
    $scope.authorInputs = [];
    $scope.addAuthorField=function(){
      $scope.authorInputs.push({});
      console.log("Usao u dodavanje polja");
    }
   $scope.removeAuthorField=function(index){
     console.log("Usao u brisanje polja");
    console.log("Brise polje sa indeksom " + index );
    $scope.authorInputs.splice(index,1);
    }
    
    $scope.title = "";
    $scope.abstract = "";
    $scope.name = "";
    $scope.description = "";
    $scope.link = "http://";
    $scope.file = {};
    
    var tmpFileName = "";
    var tmpFileNameToSave = "";
    
    $scope.fileNameChanged = function(ele) {
       $scope.file = ele.files[0];
       if(tmpFileNameToSave !== ""){
         $scope.removeFiles(tmpFileNameToSave);
       }else{
        tmpFileNameToSave = $scope.file.name;
        $scope.createFiles(tmpFileNameToSave);
       }
        console.log($scope.file);
    }
    $scope.create = function(isValid) {
      console.log("Usao u kreiranje clanka");
      if (isValid) {
        // $scope.article.permissions.push('test test');
        console.log("Usao u kreiranje clanka nakon uspesne validacije");
        console.log($scope.title);
        console.log($scope.name);
        console.log($scope.file);
        
        var article = new Article($scope.article);

        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        $scope.article = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove(function(response) {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
              $scope.articles.splice(i, 1);
            }
          }
          $location.path('articles');
        });
      } else {
        $scope.tag.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      console.log('Usao u find()');
      Article.query(function(articles) {
        $scope.articles = articles;
      });
    };
   

    $scope.findOne = function() {
      Article.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };
    
    $scope.createFiles = function(tmpFileNameToSave) {
      var filedh = new Files();
      filedh.$save(function(response) {
              console.log(response);
            });
    };
    
    $scope.removeFiles = function(tmpFileNameToSave) {
      $scope.findFiles();
      var filedh;
      
       for(var i = 0; i < $scope.filedhs.length; i++){
         if($scope.filedhs[i].originalName === tmpFileNameToSave){
            $scope.filedhs[i].$remove(function(response) {
              for (var i in $scope.filedhs) {
                if ($scope.filedhs[i] === filedh) {
                  $scope.filedhs.splice(i, 1);
                }
              }
            });
            break;
         }
       }
      
      
    };
    
   $scope.findFiles = function() {
      console.log('Usao u find()');
      Files.query(function(filedhs) {
        $scope.filedhs = filedhs;
      });
    };
    
  }
]);