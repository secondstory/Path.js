

var Point = function (x, y, z, t, prevPoint) {

  this.x             = x || 0;
  this.y             = y || 0;
  this.z             = z || 0;
  this.t             = t || 0;
  this.previousPoint = prevPoint || null;
};

var Path = function (data) {

  this.pools = [];
  var poolsize = 10;
  for (var i = 0; i < poolsize; i++) {
    this.pools.push( [] );
  }

  // find min & max time
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

  this.maxTime = maxTime;
  this.deltaT = Math.round( maxTime / poolsize );
  
  var previousPoint;

  for (var k in data) {
    point = data[k];

    if ( previousPoint ) {
      point.previousPoint = previousPoint;
    }

    if (point.t == 0) {

      this.pools[0].push(point);

    } else if (point.t == this.maxTime) {

      this.pools[this.pools.length - 1].push(point);

    } else {

      this.pools[ Math.floor( (point.t) / this.deltaT ) ].push(point);
    }
    previousPoint = point;
  }
  

};

Path.prototype.getXYZ = function (t) {

  if (typeof t !== "number" || t > this.maxTime) {
    console.log("error - Path.prototype.getXYZ - t specified is invalid");
    return null;
  }
  
  var poolIndex = 0;

  if (t == 0 ) {

    poolIndex = 0;

  } else if (t == this.maxTime) {

    poolIndex = this.pools.length - 1;

  } else {

    poolIndex = Math.floor( t / this.deltaT );
  }

  var pool = this.pools[poolIndex];

  var x = null, y = null, z = null;

  for (var i in pool) {
    
    var point = pool[i];

    if (point.t > t) {

      x = ( (point.x - point.previousPoint.x) / (point.t - point.previousPoint.t)) * (t - point.previousPoint.t) + point.previousPoint.x;
      y = ( (point.y - point.previousPoint.y) / (point.t - point.previousPoint.t)) * (t - point.previousPoint.t) + point.previousPoint.y;
      z = ( (point.z - point.previousPoint.z) / (point.t - point.previousPoint.t)) * (t - point.previousPoint.t) + point.previousPoint.z;
      break;

    } else if (point.t === t) {

      x = point.x;
      y = point.y;
      z = point.z;
      break;
    }
  }
  return {x : Math.round(x), y : Math.round(y), z : Math.round(z)};

};