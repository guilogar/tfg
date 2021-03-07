var util = require('util');
var eep = require('eep');

var monotonic  = eep.EventWorld.make().windows().monotonic(eep.Noop.noop, new eep.CountingClock());

monotonic.on('emit', function(values) {
  console.log('A window closed. Do something useful!');
});

for (var i = 1; i <= 1000000; i++) {
  monotonic.enqueue(i);
}
monotonic.tick();