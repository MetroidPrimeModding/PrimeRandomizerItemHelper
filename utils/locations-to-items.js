/**
 * Created by pwootage on 7/26/14.
 */

var jsonInput = "";
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk) {
    jsonInput += chunk;
  }
});

process.stdin.on('end', function() {
  var locations = JSON.parse(jsonInput);

  var items = {};

  for (var i in locations) {
    var loc = locations[i];
    items[loc.item] = items[loc.item] || {
      count: 0
    };
    items[loc.item].count++;
  }

  console.log(JSON.stringify(items));
});