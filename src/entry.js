import Rx from 'rx';
const t = require("transducers-js");

function randObs() {
	return	Rx.Observable.just(Math.random());
}

let source = [];
for (var i = 0; i < 1000000; ++i) {
	source.push(Math.random());
}

let sourceObs = Rx.Observable
	.range(1, 1000000)
	.selectMany(function(x) { 
		return randObs()
	})

function toPercent(x) {
	return Math.floor(x * 100);
}
function isEven(x) {
	return x % 2 === 0;
}
function sum(x, y) {
	return x + y
}

let transducer = t.comp(t.map(toPercent), t.filter(isEven));

// Native higher-order function
console.time("native higher-order function");

source
	.map(toPercent)
	.filter(isEven)
	.reduce(sum)

console.timeEnd("native higher-order function");

// Transducers
console.time("transducers");

t.transduce(transducer, sum, 0, source);

console.timeEnd("transducers");

// RxJS
console.time("rxjs");

sourceObs
	.map(toPercent)
	.filter(isEven)
	.reduce(sum)
	.subscribe(function(x) {
		// some side effect
	});

console.timeEnd("rxjs");

// Transducers + RxJS
console.time("transducers + rxjs");

sourceObs
	.transduce(transducer)
	.reduce(sum)
	.subscribe(function(x) {
		// some side effect
	});

console.timeEnd("transducers + rxjs");
