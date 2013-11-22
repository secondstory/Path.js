Linear Fit JS
=======

Turn a collection of time stamped 3D coordinates into a continous path that has linfinite resolution as a function of time.

I started to develop this tool because I needed to capture Leap Motion data and animate long the path drawn with the same timing used to record. There are other uses for this library in real time data analysis.

var path = new Path([{t : 0, x : #, y : #, z : #}, {t : #, x : #, y : #, z : #}, ... ]); // t in ms, x, y, z floating point numbers

var time = #; //ms
var vector = path.getVector(time);

console.log(vector.x);
console.log(vector.y);
console.log(vector.z);
