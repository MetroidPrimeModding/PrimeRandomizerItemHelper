/**
 * Created by pwootage on 7/24/14.
 */

var helperApp = angular.module('helper', ['ui.bootstrap']);

var pageController = helperApp.controller('PageController', ['$scope', '$http', function ($scope, $http) {
  function updateItems() {
    console.log("Updating items");
    angular.forEach($scope.items, function (value, key) {
      value.found = 0;
      value.obtained = 0;
    });
    var itemsTotal = 0;
    var itemsFound = 0;
    var itemsObtained = 0;
    angular.forEach($scope.locations, function (value, key) {
      itemsTotal++;
      var itemFound = value.actualItem;
      if (itemFound && $scope.items[itemFound]) {
        itemsFound++;
        $scope.items[itemFound].found++;
        if (value.obtained) {
          itemsObtained++;
          $scope.items[itemFound].obtained++;
        }
      }
    });
    $scope.itemFoundCount = itemsFound;
    $scope.itemObtainedCount = itemsObtained;
    $scope.itemTotalCount = itemsTotal;
  }

  $scope.locations = [];
  $scope.$watch('locations', function (newVal, oldVal) {
    if (newVal !== undefined && newVal.length !== 0) {
      localStorage['locations'] = JSON.stringify(newVal);
    }
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

  $scope.itemFoundCount = 0;
  $scope.itemObtainedCount = 0;
  $scope.itemTotalCount = 0;

  $scope.buttonText = function (obtained) {
    if (obtained) {
      return 'Obtained';
    } else {
      return 'Found';
    }
  };

  $scope.locationShow = 'all';
  $scope.shouldShowLocation = function (loc) {
    if ($scope.locationShow === 'all') {
      return true
    } else if ($scope.locationShow === 'found' && loc.actualItem && loc.actualItem !== '') {
      return true;
    } else if ($scope.locationShow === 'remaining' && (loc.actualItem === undefined || loc.actualItem === '')) {
      return true;
    }
    return false;
  };

  $scope.itemShow = 'all';
  $scope.shouldShowItem = function (item) {
    if ($scope.itemShow === 'all') {
      return true
    } else if ($scope.itemShow === 'found' && item.found > 0) {
      return true;
    } else if ($scope.itemShow === 'remaining' && item.obtained < item.count) {
      return true;
    }
    return false;
  };

  function resetImpl() {
    $http.get('../js/locations.json').success(function (data) {
      $scope.locations = data;
      updateItems();
    });
  }

  $scope.reset = function () {
    var reallyDo = confirm('Are you sure you want to reset? This cannot be undone!');
    if (reallyDo) {
      resetImpl();
    }
  };

  if (localStorage['locations']) {
    $scope.locations = JSON.parse(localStorage['locations']);
    updateItems();
  } else {
    resetImpl();
  }

  $http.get('../js/items.json').success(function (data) {
    $scope.items = data;
    updateItems();
  });
}]);