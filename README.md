Path.js
=======

Turn a collection of time stamped 3D coordinates into a continous path that has infinite resolution as a function of time.

I started to develop this tool because I needed to capture Leap Motion data and animate long the path drawn with the same timing used to record.

[Example](http://whoami.hp.af.cm/Linear_Fit_JS/test_record_mouse.html Example)

```javascript
var data = [];
var x, y, z, t;
for (var i = 0; i < 100; i++) {
  x = Math.round( Math.random() * 1000 );
  y = Math.round( Math.random() * 1000 );
  z = Math.round( Math.random() * 1000 );

  // will work with uneven time stamping
  if (i < 50) {
    t = i * 10;
  } else {
    t = i * 20;
  }
  
  console.log("x: ", x, "y: ", y, "z: ", z, "t: ", t);

  data.push( new Point(x, y, z, t) );
}

var path = new Path(data);

console.log("t = 200.1", path.getXYZ(200.1) );
console.log("t = 1013.3", path.getXYZ(1013.3) );
```