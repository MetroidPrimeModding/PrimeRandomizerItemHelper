/**
 * Created by pwootage on 7/24/14.
 */

var helperApp = angular.module('helper', ['ui.bootstrap']);

var pageController = helperApp.controller('PageController', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
  $scope.mode = 1;

  function updateItems() {
    console.log("Updating items");
    $scope.items = {};

    var itemsTotal = 0;
    var itemsFound = 0;
    var itemsObtained = 0;
    angular.forEach($scope.locations, function (value, key) {
      $scope.items[value.item] = $scope.items[value.item] || {
        count: 0,
        found: 0,
        obtained: 0
      };
      $scope.items[value.item].count++;
    });
    angular.forEach($scope.locations, function (value, key) {
      itemsTotal++;
      var itemFound = value.actualItem;
      if ($scope.items[itemFound] && itemFound) {
        if (value.found) {
          itemsFound++;
          $scope.items[itemFound].found++;
        }
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

  $scope.loadBlankDropdown = false;

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

  $scope.fixObtained = function (location) {
    if (!location.found) {
      return false;
    }
    return location.obtained;
  };

  $scope.locationShow = 'all';
  $scope.shouldShowLocation = function (loc) {
    if ($scope.locationShow === 'all') {
      return true
    } else if ($scope.locationShow === 'found' && loc.actualItem && loc.actualItem !== '') {
      return true;
    } else if ($scope.locationShow === 'remaining' && (loc.obtained === undefined || loc.obtained === false)) {
      return true;
    }
    return false;
  };

  $scope.locationSearchImpl = function(searchTerm) {
    return function(location) {
      if (searchTerm === undefined || searchTerm.trim().length === 0) return true;
      if (location.area.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) return true;
      if (location.location.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) return true;
      if (location.item.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) return true;
      if (location.found && location.actualItem.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) return true;
      return false;
    };
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

  function resetImpl(cb) {
    if ($scope.mode === 1) {
      $http.get('../js/locations.json').success(function (data) {
        $scope.locations = data;
        if (cb) {
          cb(data);
        }
        updateItems();
      });
    } else if ($scope.mode === 2) {
      $http.get('../js/locations-prime2.json').success(function (data) {
        $scope.locations = data;
        if (cb) {
          cb(data);
        }
        updateItems();
      });
    }

  }

  function setDataFromParser(data) {
    if (data.itemList.length == 100) {
      $scope.mode = 1;
    } else if (data.itemList.length == 115) {
      $scope.mode = 2;
    } else {
      alert('Wrong number of items in that list, not sure what it is... (' + data.itemList.length + ')');
    }
    resetImpl(function () {
      var loaded = 0;
      var tempList = angular.copy(data.itemList);
      angular.forEach($scope.locations, function (value, key) {
        for (var i = 0; i < tempList.length; i++) {
          var matches = 0;
          if (value.area === tempList[i].area) matches++;
          if (value.location === tempList[i].location) matches++;
          //if (value.item === tempList[i].originalItem) matches++;
          if (matches >= 2) {
            loaded++;
            $scope.locations[key].actualItem = tempList[i].item;
            tempList.splice(i, 1);
            break;
          }
        }
      });
      if (loaded === 100 || loaded === 115) {
        alert('Loaded ' + loaded + ' items!');
      } else {
        alert('Loaded ' + loaded + ' items: If this is unexpected, please submit this log as a bug report so I can figure out what\'s wrong!');
      }
    });
  }

  $scope.reset = function (prime) {
    $scope.loadBlankDropdown = false;
    var reallyDo = confirm('Are you sure you want to reset? This cannot be undone!');
    if (reallyDo) {
      $scope.mode = prime;
      resetImpl();
    }
  };

  if (localStorage['locations']) {
    $scope.locations = JSON.parse(localStorage['locations']);
    updateItems();
  } else {
    resetImpl();
  }

  $scope.loadLogFile = function () {
    var modal = $modal.open({
      controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.loadFile = function (file) {
          $modalInstance.close(file);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }],
      templateUrl: './loadLog.html'
    });
    modal.result.then(function (file) {
      window.logParser.loadFromBrowserFile(file, function (data) {
        setDataFromParser(data);
        $scope.fileData = data;
      });
    });
  };

  $scope.checkCompletability = function() {
    var completability = window.completabilityCheck($scope.locations);
    $modal.open({
      controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.comp = completability;
        $scope.close = function () {
          $modalInstance.close();
        };
      }],
      templateUrl: './completability.html'
    });
  }

}]);

var fileModel = helperApp.directive('fileDragger', [function () {
  return {
    templateUrl: './fileDrag.html',
    transclude: true,
    scope: {
      fileDragger: '=',
      fileDropCallback: '='
    },
    link: function (scope, element) {
      scope.hover = false;
      console.log(element);
      element.bind('dragover', function (event) {
        event.preventDefault();
        return false;
      });
      element.bind('dragenter', function (event) {
        console.log('enter');
        scope.$evalAsync('hover = true');
        event.preventDefault();
        return false;
      });
      element.bind('dragleave', function (event) {
        scope.$evalAsync('hover = false');
        console.log('leave');
        return false;
      });
      element.bind('drop', function (event) {
        console.log('drop');
        event.preventDefault();
        scope.$apply(function () {
          scope.fileDragger = event.originalEvent.dataTransfer.files[0];
          scope.hover = false;
          if (scope.fileDropCallback && typeof(scope.fileDropCallback) === 'function') {
            scope.fileDropCallback(scope.fileDragger);
          }
        });
      });
    }
  }
}]);