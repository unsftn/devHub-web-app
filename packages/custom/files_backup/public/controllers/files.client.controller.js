'use strict';



angular.module('mean.files').controller('FilesController', ['$scope', '$stateParams', '$location', 'Global', 'Files', 'MeanUser',
  function($scope, $stateParams, $location, Global, Files, MeanUser) {
    $scope.global = Global;
	$scope.error = [];
    var MAX_SIZE = 52428800; //MAX SIZE OF FILE(50MB)

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return MeanUser.isAdmin || article.user._id === MeanUser.user._id;
    };

    /*
		When content of input field changes, check if type is pdf
		and if size is less than 50MB.

		If files list is empty then probably clear happened or nothing had been choosen.
    */
    $scope.onChangeInputField = function(inputField){

    	if(inputField.files.length != 0){
    		if(inputField.files[0].type !== "application/pdf"){
    			$scope.error.push("Tip dokumenta mora biti pdf.");
    			return false;
    		}else{
    			for(var i = 0; i < $scope.error.length; i++){
    				if($scope.error[i] === "Tip dokumenta mora biti pdf."){
    					$scope.error.splice(i,1);
    					break;
    				}
    			}
    		}
    		if(inputField.files[0].size > MAX_SIZE){
    			$scope.error.push("Maksimalna velicina dokumenta je 50MB");
    		}else{
    			for(var i = 0; i < $scope.error.length; i++){
    				if($scope.error[i] === "Maksimalna velicina dokumenta je 50MB"){
    					$scope.error.splice(i,1);
    					break;
    				}
    			}
    		}
    		if($scope.error.length === 0){
    			$scope.error = [];
    			return true;
    		}
    	} else {
    		$scope.error = [];
    		return true;
    	}

    };

   	/*
		Clear input field.
		Clone input field in itself in order to clean it.
		Call $scope.onChangeInputField function in order to remove error.
   	*/

   	$scope.clearInputField = function(inputField){

   		inputField.replaceWith( inputField = inputField.clone( true ) );
   		$scope.onChangeInputField(inputField);

   	};

   	/*
		Function that changes name of file it already exists on server.
   	*/

   	$scope.checkFileName = function (tmpName, allNames, j){
   		var exists = false;                                                //if name exists after it has been tried to be changed, this become true
   		for(var i = 0; i < allNames.length; i++){

   			var allNamestTokens = allNames[i].split(".");                  //take only file name, without extension
 
   			if(allNamestTokens[0] === tmpName){                            

	    		while(1){
	    			tmpName += j;                                          //add number to file name. exmpl: old name= tmpFile, new Name = tmpFile1
	    			for(var j = 0; j < allNames.length; j++){
	    				var allNamestTokens = allNames[i].split(".");

	    				if(allNamestTokens[0] === tmpName){
	    					exists = true;
	    					break;
	    				}
	    			}
	    			if(exists === true){
	    				exists = false;
	    				j++;
	    			}
	    			else
	    				return tmpName;                                    //return new name
	    		} 
	    		 
	    	}
	    }

	    return tmpName;                                                    //return old name

   	};

    $scope.create = function(isValid) {
      if (isValid) {

      	/* If there is some error do not save file*/
      	if( $scope.onChangeInputField($scope.file) === false ){
      		return false;
      	}

      	// file path
		var filePath = $scope.file.val();
		// store an pdf in binary in mongo
	    var fileObj = new File();
	    fileObj.file.data = fs.readFileSync(filePath);
	    fileObj.file.contentType = 'application/pdf';

	    var tokens = $scope.file.files[0].name.split(".");
		var allNames = Files.find({}, 'name -_id', function (err, docs) {});
		var j = 0;
	    fileObj.name = $scope.checkFileName(tokens[0], allNames, j);
	    fileObj.name += tokens[1];

        fileObj.$save(function(response) {
          $location.path('files/' + response._id);
        });

        $scope.file = {};

      } else {
        $scope.submitted = true;
      }
    };
    /*
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
        $scope.article.$remove(function(response) {
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
	*/
    $scope.find = function() {
      Files.query(function(files) {
        $scope.files = files;
      });
    };

    $scope.findOne = function() {
      Files.get({
        fileId: $stateParams.fileId
      }, function(file) {
        $scope.file = file;
      });
    };
  }
]);