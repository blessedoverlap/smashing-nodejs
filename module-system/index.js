/*
var a = require('./module_a');

console.log(a.name);
console.log(a.data);
console.log(a.getPrivate());


var Person = require('./person');
var john = new Person('John');
john.talk();
*/

var EventEmitter = require('events').EventEmitter
  , a = new EventEmitter;
a.on('event1', function () {
  console.log('event called');
});
a.emit('event1');