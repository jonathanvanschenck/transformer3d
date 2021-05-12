
const network = require('./lib/network.js');
const quaternion = require('./lib/quaternion.js');

module.exports = exports = {
  CoordinateNetwork : network.CoordinateNetwork,
  UnitQuaternion : quaternion.UnitQuaternion,
  quaternion : quaternion,
  network : network,
  transform : require('./lib/transform.js'),
  euclidean : require('./lib/euclidean.js'),
  shift : require('./lib/shift.js'),
  pinhole : require('./lib/pinhole.js')
}
