/**
 * Euclidean objects for roto-translations of 3d vectors. This is a double cover of SE(3), the
 * special Euclidean group in 3 dimensions.
 *
 * @module euclidean
 */

const { UnitQuaternion } = require('./quaternion.js');
const { Shift } = require('./shift.js');


/**
 * Euclidean (roto-translation) objects for 3d vectors
 *
 * These follow affine transformation conventions, where the rotation
 * is applied before the shift.
 */
class Euclidean {
  /**
   * Constructor
   */
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

  /**
   * Set the vectors for the quaternion and shift
   *
   * @param {number[]} qvec - the rotation quaternion vector: `[re, i, j, k]`
   * @param {number[]} vec - the 3d shift vector
   * @return {this}
   */
  set_vecs( qvec, vec ) {
    this.quat.set_vec( qvec );
    this.shift.set_vec( vec );
    return this;
  }

  /**
   * Set the internal quaternion and shift objects
   *
   * @param {UnitQuaternion} quat - the rotation quaternion
   * @param {Shift} shift - the shift
   * @return {this}
   */
  set_objects( quat, shift ) {
    this.quat = quat;
    this.shift = shift;
    return this;
  }

  /**
   * Set this as the composite of two other (Reverse)Euclidean transformations
   *
   * @param {Euclidean|ReverseEuclidean} first - the first transform to be applied
   * @param {Euclidean|ReverseEuclidean} second - the second transform to be applied
   * @return {this}
   */
  set_as_composite( first, second ) {
    this.quat.set_as_composite( first.quat, second.quat );
    // shift is applied after rotation
    this.shift.set_vec(
      second.transform_vec( first.translation )
    );

    return this;
  }
  

  /**
   * Transform a vector with this rotation and shift
   *
   * @param {number[]} vec - a 3d vector to be transformed
   * @return {number[]} the transformed vector
   */
  transform_vec ( vec ) {
    return this.shift.shift(this.quat.rotate( vec ));
  }

  /**
   * Transform a vector with this rotation and shift in place
   *
   * @param {number[]} vec - a 3d vector to be transformed in place
   * @return {undefined}
   */
  transform_vec_ip ( vec ) {
    this.quat.rotate_ip( vec );
    this.shift.shift_ip( vec );
  }

  /**
   * Undo a transform of a vector with this rotation and shift
   *
   * @param {number[]} vec - a 3d vector to be untransformed
   * @return {number[]} the untransformed vector
   */
  untransform_vec ( vec ) {
    return this.quat.unrotate(this.shift.unshift( vec ));
  }

  /**
   * Undo a transform of a vector with this rotation and shift in place
   *
   * @param {number[]} vec - a 3d vector to be untransformed in place
   * @return {undefined}
   */
  untransform_vec_ip ( vec ) {
    this.shift.unshift_ip( vec );
    this.quat.unrotate_ip( vec );
  }

  /**
   * Transform an orientation quaternion with this coordinate rotation
   *
   * @param {UnitQuaternion} quat - the orientation quaternion to be transformed
   * @return {UnitQuaternion} the transformed quaternion
   */
  transform_quat ( quat ) {
    return quat.with_coordinate_convention( this.quat );
  }

  /**
   * Transform an orientation quaternion with this coordinate rotation in place 
   *
   * @param {UnitQuaternion} quat - the orientation quaternion to be transformed in place
   * @return {undefined}
   */
  transform_quat_ip ( quat ) {
    quat.set_with_coordinate_convention( this.quat );
  }

  /**
   * Undo a transform of an orientation quaternion with this coordinate rotation
   *
   * @param {UnitQuaternion} quat - the orientation quaternion to be untransformed
   * @return {UnitQuaternion} the untransformed quaternion
   */
  untransform_quat ( quat ) {
    return quat.without_coordinate_convention( this.quat );
  }

  /**
   * Undo a transform of an orientation quaternion with this coordinate rotation in place 
   *
   * @param {UnitQuaternion} quat - the orientation quaternion to be untransformed in place
   * @return {undefined}
   */
  untransform_quat_ip ( quat ) {
    quat.set_without_coordinate_convention( this.quat );
  }

  orient ( quat ) {
    return quat.with_reference( this.quat );
  }

  orient_ip ( quat ) {
    quat.set_with_reference( this.quat );
  }

  unorient ( quat ) {
    return quat.without_reference( this.quat );
  }

  unorient_ip ( quat ) {
    quat.set_without_reference( this.quat );
  }
};


/**
 * Reverse Euclidean (roto-translation) objects for 3d vectors
 *
 * This is almost exactly the same as Euclidean, except the shifts 
 * is applied before the rotation.
 */
class EuclideanReverse extends Euclidean {
  
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
        second.transform_vec( first.translation )
      )
    );

    return this;
  }
  

  transform_vec ( vec ) {
    return this.quat.rotate(this.shift.shift( vec ));
  }

  transform_vec_ip ( vec ) {
    this.shift.shift_ip( vec );
    this.quat.rotate_ip( vec );
  }

  untransform_vec ( vec ) {
    return this.shift.unshift(this.quat.unrotate( vec ));
  }

  untransform_vec_ip ( vec ) {
    this.quat.unrotate_ip( vec );
    this.shift.unshift_ip( vec );
  }
}



module.exports = exports = {
  Euclidean : Euclidean,
  EuclideanReverse : EuclideanReverse
}
