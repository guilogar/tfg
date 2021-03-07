var util = require('util');
var eep = require('eep');

var stats = [ 
  eep.Stats.count, eep.Stats.sum, eep.Stats.min, eep.Stats.max, 
  eep.Stats.mean, eep.Stats.vars, eep.Stats.stdevs 
];
var headers = [ 'Count\t\t', 'Sum\t\t', 'Min\t\t', 'Max\t\t', 'Mean\t\t', 'Variance\t', 'Stdev\t\t' ];
var monotonic  = eep.EventWorld.make().windows().monotonic(Stats.all, new eep.CountingClock());

monotonic.on('emit', function(values) {
  console.log(JSON.stringify(values));
});

for (var i = 1; i <= 1000000; i++) {
  monotonic.enqueue(i);
}
monotonic.tick();