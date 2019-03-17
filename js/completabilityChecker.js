/**
 * Created by pwootage on 8/1/14.
 */
(function(angular) {
  var requiredItems = [
    'Wave Beam',
    'Plasma Beam',
    'Ice Beam',
    'Artifact of Lifegiver',
    'Artifact of Wild',
    'Artifact of World',
    'Artifact of Sun',
    'Artifact of Elder',
    'Artifact of Spirit',
    'Artifact of Truth',
    'Artifact of Chozo',
    'Artifact of Warrior',
    'Artifact of Newborn',
    'Artifact of Nature',
    'Artifact of Strength',
    'Phazon Suit'
  ];
  var requirementsItems = {};
  angular.injector(['ng']).invoke(function($http) {
    $http.get("../js/requirements-items.json").success(function(data) {
      requirementsItems = data;
    });
  });
  var completabilityCheck = function(locations) {
    var indexLookup = {};
    for (var i = 0; i < locations.length; i++) {
      indexLookup[locations[i].actualItem] = indexLookup[locations[i].actualItem] || [];
      indexLookup[locations[i].actualItem].push(i);
    }

    var res = {};
    var isCompletable = true;
    for (var j = 0; j < requiredItems.length; j++){
      res[requiredItems[j]] = dfs(indexLookup, locations, requiredItems[j]);
      isCompletable = isCompletable && res[requiredItems[j]].obt;
    }
    res.isCompletable = isCompletable;
    return res;
  };

  var dfs = function(il, loc, item) {
    console.log(item);
    var itemInd = il[item][0];
    var me =loc[itemInd];
    if (me.visits >= 1) {
      return {
        obt: false,
        trace: [me.actualItem]
      };
    } else {
      var locCopy = angular.copy(loc);
      return _dfs(il, locCopy, itemInd);
    }
  };

  var _dfs = function(il, loc, i) {
    var me = loc[i];
    me.visits = me.visits || 0;
    me.visits++;
    var myReq = me.requires;
    if (myReq === undefined || myReq === []) {
      return {
        obt: true,
        trace: [me.actualItem]
      };
    } else {
      var impossibleReqs = [];
      rsLoop: for (var requireSet = 0; requireSet < me.requires.length; requireSet++) {
        var rs = me.requires[requireSet];
        var rRes = [];
        //Check each requirement
        for (var requirement = 0; requirement < rs.length; requirement++) {
          var r = requirementsItems[rs[requirement]];
          //Some requirements (supers!) have two required items
          for (var itemReq = 0; itemReq < r.length; itemReq++) {
            var ir = r[itemReq];
            var search = dfs(il, loc, ir);
            rRes.push(search);
            if (!search.obt) {
              impossibleReqs.push(search);
              continue rsLoop;
            }
          }
        }
        //Requirement is obtainable - since only one set is needed, we're good
        var allTraces = rRes.map(function(obj) {
          return obj.trace;
        });
        return {
          obt: true,
          trace: [me.actualItem].concat(allTraces)
        };
      }
      var allImpTraces = impossibleReqs.map(function(obj) {
        return obj.trace;
      });
      //No requirements are possible; we're dead.
      return {
        obt: false,
        trace: [me.actualItem].concat(allImpTraces)
      };
    }
  };
  window.completabilityCheck = completabilityCheck;
})(angular);