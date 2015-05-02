/**
 * Created by pwootage on 7/29/2014.
 */

var parser = (function () {
  var helper = {
    loadFromBrowserFile: function (fileToLoad, callback) {
      var reader = new FileReader();
      reader.onload = function (file) {
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
      var pickups = /^Excluded pickups:\s(([0-9]+\s*)*)$/.exec(lines[1]);
      ret.seed = parseInt(seed[1]) || 0;
      ret.pickupsFixed = pickups[1].trim().split(' ') || [];
      var itemList = [];
      var p1zones = ['Chozo', 'Phendrana', 'Tallon', 'Mines', 'Magmoor'];
      for (var i = 2; i < lines.length; i++) {
        var lineP1 = /^([^-]+) - (.+) - (.+)$/.exec(lines[i].replace(/\s(-\s)+/gm, ' - '));
        var lineP2 = /^([^-]+) - (.+) - (.+) - (.+)$/.exec(lines[i]);
        if (lineP1 && p1zones.filter(function(v) {return v == lineP1[1]}).length > 0) {
          itemList.push({
            area: lineP1[1].trim(),
            location: lineP1[2].trim(),
            //originalItem: line[3],
            item: lineP1[3].trim()
          });
          found = true;
        } else if (lineP2) {
          itemList.push({
            area: lineP2[1].trim(),
            location: lineP2[2].trim(),
            originalItem: lineP2[3].trim(),
            item: lineP2[4].trim()
          });
        } else {
          console.log('Unknown line:', '\'' + lines[i] + '\'');
        }
      }
      ret.itemList = itemList;
      console.log("End file parse");
      return ret;
    }
  };
  return helper;
})();
window.logParser = parser;