/**
 * Created by pwootage on 7/24/14.
 */

var helperApp = angular.module('helper', ['ui.bootstrap']);

var pageController = helperApp.controller('PageController', ['$scope', '$http', function ($scope, $http) {
  function updateItems() {
    console.log("Updating items");
    angular.forEach($scope.items, function (value, key) {
      value.found = 0;
    });
    angular.forEach($scope.locations, function (value, key) {
      var itemFound = value.actualItem;
      if (itemFound) {
        $scope.items[itemFound].found++;
      }
    });
  }

  $scope.locations = [];
  $scope.$watch('locations', function (newVal, oldVal) {
    updateItems();
  }, true);

  $scope.items = [];

  $scope.itemsRemaining = function () {
    var ret = [];
    angular.forEach($scope.items, function (value, key) {
      if (value.found < value.count) {
        ret.push(key);
      }
    });
    return ret;
  };

  if (localStorage['locations']) {
    $scope.locations = JSON.fromJson(localStorage['locations']);
    updateItems();
  } else {
    $http.get('../js/locations.json').success(function (data) {
      $scope.locations = data;
      updateItems();
    });
  }

  $http.get('../js/items.json').success(function (data) {
    $scope.items = data;
    updateItems();
  });
}]);