'use strict';

angular.module('webApp.addPost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AddPostCtrl'
	});
}])

.controller('AddPostCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var user = firebase.auth().currentUser;
	var uid;
	if (user != null) {
	  $scope.uid = user.uid;
	}


	var ref = firebase.database().ref().child($scope.uid+'/Articles');
	$scope.articles = $firebaseArray(ref);






	$scope.createPost = function(){
		var uid = $scope.uid;
		var title = $scope.article.titleTxt;
		var post = $scope.article.postTxt;
		var dateStr = $scope.article.postDate.toString();
		var date = dateStr.slice(0,15);
		var type = $scope.article.postType;
		$scope.articles.$add({
			title: title,
			post: post,
			date: date,
			type: type,
			uid: uid
		}).then(function(ref){
			console.log(ref);
			$scope.success = true;
			window.setTimeout(function() {
				$scope.$apply(function(){
					$scope.success = false;
				});
			}, 2000);
		}, function(error){
			console.log(error);
		});
	};

}]);
