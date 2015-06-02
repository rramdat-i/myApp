angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, Camera) {
  $scope.takeSelfie = function() {
      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
      }, function(err) {
        console.err(err);
      });
    };
})

.controller('DashCtrl', function($scope) {})

.controller('PlaylistCtrl', function($scope, PlaylistService) {
  var promise = PlaylistService.getAll();

  promise.success(function (response) {
    $scope.items = response;
  });

  $scope.doRefresh = function() {
    var refreshPromise = PlaylistService.getAll();

    refreshPromise
    .success(function(response) {
      $scope.items = response;
      $scope.$apply();
      $scope.$broadcast('scroll.refreshComplete');
    })
    .error(function (error) {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
