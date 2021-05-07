/**
 * Euclidean objects for roto-translations of 3d vectors. This is a double cover of of SE(3), the
 * special Euclidean group in 3 dimensions.
 *
 * @module euclidean
 */

const { UnitQuaternion } = require('./quaternion.js');
const { Shift } = require('./shift.js');


/**
 * Euclidean (roto-translation) objects for 3d vectors
 *
 * Note, this rotates first, then shifts
 */
class Euclidean {
  constructor () {
    this.quat = new UnitQuaternion();
    this.shift = new Shift();
  }

  /**
   * Get the effective shift post rotation
   *
   * @return {number[]} 3d vector of shift
   */
  get translation() {
    // shift is applied after rotation
    return this.shift.vec;
  }

  set_vecs( qvec, vec ) {
    this.quat.set_vec( qvec );
    this.shift.set_vec( vec );

    return this;
  }

  set_objects( quat, shift ) {
    this.quat = quat;
    this.shift = shift;

    return this;
  }

  set_as_composite( first, second ) {
    this.quat.set_as_composite( first.quat, second.quat );
    // shift is applied after rotation
    this.shift.set_vec(
      second.transform( first.translation )
    );

    return this;
  }
  

  transform ( vec ) {
    return this.shift.shift(this.quat.rotate( vec ));
  }

  transform_ip ( vec ) {
    this.quat.rotate_ip( vec );
    this.shift.shift_ip( vec );
  }

  untransform ( vec ) {
    return this.quat.unrotate(this.shift.unshift( vec ));
  }

  untransform_ip ( vec ) {
    this.shift.unshift_ip( vec );
    this.quat.unrotate_ip( vec );
  }

  // FIXME : transforming orientations requires counter rotation?
  orient ( quat ) {
    return quat.before( this.quat );
  }

  orient_ip ( quat ) {
    quat.set_before( this.quat );
  }

  unorient ( quat ) {
    return quat.after( this.quat );
  }

  unorient_ip ( quat ) {
    quat.set_after( this.quat );
  }
};


/**
 * Reverse Euclidean (roto-translation) objects for 3d vectors
 *
 * Note, this shifts first then rotates
 */
class EuclideanReverse extends Euclidean {
  
  /**
   * Get the effective shift post rotation
   *
   * @return {number[]} 3d vector of shift
   */
  get translation() {
    // shift is applied before rotation
    return this.quat.rotate(this.shift.vec);
  }

  set_as_composite( first, second ) {
    this.quat.set_as_composite( first.quat, second.quat );
    // shift is applied before rotation
    // Is there a better way to do this?
    this.shift.set_vec(
      this.quat.unrotate(
        second.transform( first.translation )
      )
    );

    return this;
  }
  

  transform ( vec ) {
    return this.quat.rotate(this.shift.shift( vec ));
  }

  transform_ip ( vec ) {
    this.shift.shift_ip( vec );
    this.quat.rotate_ip( vec );
  }

  untransform ( vec ) {
    return this.shift.unshift(this.quat.unrotate( vec ));
  }

  untransform_ip ( vec ) {
    this.quat.unrotate_ip( vec );
    this.shift.unshift_ip( vec );
  }
}



module.exports = exports = {
  Euclidean : Euclidean,
  EuclideanReverse : EuclideanReverse
}
