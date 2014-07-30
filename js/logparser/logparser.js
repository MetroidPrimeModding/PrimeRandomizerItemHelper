/**
 * Created by pwootage on 7/29/2014.
 */

var parser = (function (angular) {
  var helper = {
    loadFromBrowserFile: function(fileToLoad, callback) {
      var reader = new FileReader();
      reader.onload = function(file) {
        callback(helper.parse(reader.result));
      };
      reader.readAsText(fileToLoad);
    },
    parse: function (data) {
      var ret = {};
      console.log("Beginning file parse");
      var lines = data.split(/[\n\r]+/);
      console.debug(lines);
      var seed = /Seed:\s+([0-9]+)/.exec(lines[0]);
      var pickups = /^Excluded pickups:\s(([0-9]+\s)*)$/.exec(lines[1]);
      ret.seed =  parseInt(seed[1]) || 0;
      ret.pickupsFixed = pickups[1].trim().split(' ') || [];
      var itemList = [];
      for (var i = 2; i < lines.length; i++) {
        var line = /^(.+) - (.+) - (.+) - (.+)$/.exec(lines[i]);
        if (line) {
          itemList.push({
            area: line[1],
            location: line[2],
            originalItem: line[3],
            item: line[4]
          });
        } else {
          console.log('Unknown line:', '\''+lines[i]+'\'');
        }
      }
      ret.itemList = itemList;
      console.log("End file parse");
      return ret;
    }
  };
  return helper;
})(angular);
window.logParser = parser;