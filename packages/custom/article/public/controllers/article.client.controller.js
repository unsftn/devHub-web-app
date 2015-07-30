'use strict';

angular.module('mean.article', ['ngFileUpload']).controller('ArticleController', ['$scope', '$stateParams', '$location', 'Global', 'Article','Files','Document', 'MeanUser', 'Circles','Upload',
  function($scope, $stateParams, $location, Global, Article,Files,Document, MeanUser,Circles,Upload) {
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
    $scope.link = "";
    $scope.file = {};
     $scope.fileId;
    $scope.document;

     /*
    var tmpFileName = "";
    var tmpFileNameToSave = "";
    
    

   
    $scope.fileNameChanged = function(ele) {
      $scope.files = ele;
       $scope.file = ele.files[0];
       if(tmpFileNameToSave !== ""){
         $scope.removeFiles(tmpFileNameToSave);
       }else{
        tmpFileNameToSave = $scope.file.name;
        //$scope.createFiles(tmpFileNameToSave);
         $scope.upload(ele.files);
         
       }
        console.log($scope.file);
        console.log($scope.files);
    }

    
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    */
    $scope.onSubmit = function(ele){

     $scope.upload(ele.files);
      
    }
    

    
    $scope.uploadIt = function (files) {
      $scope.upload($scope.files);
    }
    
     $scope.upload = function (files) {
            //if (files && files.length) {
                Upload.upload({url: '/api/files', file: files[0]}).progress(function (event) {
                    var progressPercentage = parseInt(100.0 * event.loaded / event.total);
                    console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    
                    $scope.fileId = data._id;
                    $scope.createDocument(true); //kreiraj dokument 


                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
            //}
        };
      

     
    
    $scope.createDocument = function(isValid) {

      if (isValid) {
        // $scope.article.permissions.push('test test');
        var document = {};
        document.name = $scope.name;
        document.description = $scope.description;
        document.link = $scope.link;
        document.file = $scope.fileId;
        
        var document = new Document(document);

        document.$save(function(response) {
          $scope.document = response._id;
          console.log("Uspesno sacuvan dokument " + response._id);
          //$location.path('documents/' + response._id);
          $scope.create(true);        //kreiraj clanak		
        });

        document = {};

      } else {
        $scope.submitted = true;
      }
    };
    
    $scope.create = function(isValid) {
      console.log("Usao u kreiranje clanka");
      if (isValid) {
        var articleObj = {};
        articleObj.title = $scope.title;
        articleObj.abstract = $scope.abstract;
        articleObj.documents = [];
        articleObj.documents.push($scope.document);
        
        var article = new Article(articleObj);

        

        article.$save(function(response) {
          console.log("Uspesno sacuvan clanak " + response._id);
          $location.path('articles/' + response._id);
        });

        $scope.article = {};

      } else {
        $scope.submitted = true;
        $location.path('articles/');
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
      var filedh = new Files($scope.files);
      $scope.articles = {};
      $scope.articles.title = "Neki naslov";
      var article = new Article($scope.articles);
      filedh.$save(function(response) {
              console.log(response);
            });
      $scope.file = {};
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