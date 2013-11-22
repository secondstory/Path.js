

var Point = function (x, y, z, t) {

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.t = t || 0;
};

var Path = function (data) {

  this.pools = [];
  var poolsize = 10;
  for (var i = 0; i < poolsize; i++) {
    this.pools.push( [] );
  }

  // find max time
  var minTime = 0;
  var maxTime = 0;
  var point;
  for (var j in data) {
    point = data[j];
    if (point.t > maxTime) {
      maxTime = point.t; 
    }
    if (point.t < minTime) {
      minTime = point.t; 
    }
  }
  console.log("minTime: ", minTime); // should be 0
  console.log("maxTime: ", maxTime);
  this.maxTime = maxTime;

  this.deltaT = Math.round( maxTime / poolsize );
  
  for (var k in data) {
    point = data[k];

    if (point.t == 0) {

      this.pools[0].push(point);

    } else if (point.t == this.maxTime) {

      this.pools[this.pools.length - 1].push(point);

    } else {

      this.pools[ Math.floor( (point.t) / this.deltaT ) ].push(point);
    }
  }
  

};

Path.prototype.getXYZ = function (t) {

  if (t > this.maxTime) {
    return null;
  }
  
  var poolIndex = 0;

  if (point.t == 0 ) {

    poolIndex = 0;

  } else if (point.t == this.maxTime) {

    poolIndex = this.pools.length - 1;

  } else {

    poolIndex = Math.floor( (point.t) / this.deltaT );
  }
};