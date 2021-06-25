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

  // HACK! used by 'network.CoordinateSystem.get_euclidean_transform_to'
  //        This kinda breaks the convention of NOT generating new objects.
  //        Should probably rework both quaternion and shift objects to 
  //        expose their inverses more easily, so that this can just be a 
  //        reference, rather than actually generating a totally new 
  //        object.
  get_inv() {
    let e = new Euclidean();
    e.set_vecs( this.quat.qvec_inv, this.quat.unrotate(this.translation).map((v) => -v));
    return e;
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
   * Get a json representation of this transformation
   *
   * Format : 
   * ```json
   * {
   *     "quat" : {
   *         "re" : "real part",
   *         "i"  : "i component",
   *         "j"  : "j component",
   *         "k"  : "k component"
   *     },
   *     "shift" : [ "x", "y", "z" ],
   *     "type"  : "Euclidean/EuclideanReverse"
   * }
   * ```
   * Note that the `type` key specifies if the shift is applied before or
   * after the rotation.
   *
   * @return {Object}
   */
  get json() {
    return {
      quat : this.quat.json,
      shift : this.shift.vec,
      type : this.constructor.name
    };
  }

  /**
   * Get the affine transformation which is equivalent to this transformation
   *
   * This (reverse) euclidean transformation (`this.transform_vec(vec)`) is 
   * equivalent to an affine transformation of the form: `A * vec^T + b^T`,
   * and it is this `A` and `b` which are returned by this method.
   *
   * Format:
   * ```json
   * {
   *     "A" : "3x3 matrix, equivalent to this quaternion's rotation action",
   *     "b" : "3d vector, to be applied as a shift AFTER matrix multiplication"
   * }
   * ```
   *
   * @return {Object}
   */
  get affine() {
    return {
      A : this.quat.matrix,
      b : this.translation
    };
  }

  /**
   * Get the inverse affine transformation associated with this transformation
   *  
   * This method gets the inverse transformation of `this.affine`. Such that if
   * A and b are aquired from `this.affine`, and A' and b' are aquired from
   * this getter, then `vec^T = A' * (A * vec^T + b^T) + b'^T`
   *
   * Format:
   * ```json
   * {
   *     "A" : "3x3 matrix",
   *     "b" : "3d vector"
   * }
   * ```
   *
   * @return {Object}
   */
  get affine_inv() {
    return {
      A : this.quat.matrix_inv,
      b : this.quat.unrotate(this.translation).map((v)=>-v)
    };
  }

  /**
   * Get the equivalent homogeneous matrix from this transformation
   *
   * If A is the matrix returned by this method, then
   * the matrix product `[x',y',z',w']^T = A * [x,y,z,w]^T` is will produce
   * the same inhomogenous vector ([x'/w', y'/w', z'/w'])` as `this.transform_vec([x,y,z])`
   *
   * @return {Matrix} 4x4 matrix equivalent to this transformation
   */
  get matrix() {
    let mat = this.quat.matrix;
    let vec = this.translation;
    for (let i = 0; i < 3; i ++) {
      mat[i][3] = vec[i];
    }
    mat[3] = [0,0,0,1];
    return mat;
  }

  /**
   * Get the equivalent homogeneous inverse matrix from this transformation
   *
   * If A is the matrix returned by this method, then
   * the matrix product `[x',y',z',w']^T = A * [x,y,z,w]^T` is will produce
   * the same inhomogenous vector ([x'/w', y'/w', z'/w'])` as `this.untransform_vec([x,y,z])`
   *
   * @return {Matrix} 4x4 inverse matrix equivalent to this transformation
   */
  get matrix_inv() {
    let mat = this.quat.matrix_inv;
    let vec = this.quat.unrotate(this.translation).map((v) => -v);
    for (let i = 0; i < 3; i ++) {
      mat[i][3] = vec[i];
    }
    mat[3] = [0,0,0,1];
    return mat;
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
   * Set this as the composite of this then another (Reverse)Euclidean transformation
   *
   * @param {Euclidean|ReverseEuclidean} other - the transform to be applied after this
   * @return {this}
   */
  set_as_before( other ) {
    this.quat.set_as_before( other.quat );
    // shift is applied after rotation
    this.shift.set_vec(
      other.transform_vec( this.translation )
    );

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

  //   I don't think this actually makes any sense: euclidean transformations don't actually
  //   convert coordinates from one representation to another (like A->A`, B->B', etc) where
  //   A and A' represent the same physical reference point, but where the x-axes means different
  //   physical directions, as much as they convert between different coordinate representations
  //   (like A->B), where A and B represent different physical reference points. So, using an 
  //   euclidean transformation as the foundation for changing the cooridinate convention of
  //   a quaternion doesn't actually make sense. Rather, by the time we even have transformations,
  //   we have already decided upon an coordinate convention (like x=right), so any coordinate
  //   convention transformation should happen to a quaternion before it get's passed to a 
  //   transformation.
//   /**
//    * Transform an orientation quaternion with this transformation.
//    *
//    * See `UnitQuaternion.with_coordinate_convention` for details
//    *
//    * @param {UnitQuaternion} quat - the orientation quaternion to be transformed
//    * @return {UnitQuaternion} the transformed quaternion
//    */
//   transform_quat ( quat ) {
//     return quat.with_coordinate_convention( this.quat );
//   }
// 
//   /**
//    * Transform an orientation quaternion with this coordinate rotation in place 
//    *
//    * See `.transform_quat( ... )` for details
//    *
//    * @param {UnitQuaternion} quat - the orientation quaternion to be transformed in place
//    * @return {undefined}
//    */
//   transform_quat_ip ( quat ) {
//     quat.set_with_coordinate_convention( this.quat );
//   }
// 
//   /**
//    * Undo a transform of an orientation quaternion with this coordinate rotation
//    *
//    * See `.transform_quat( ... )` for details
//    *
//    * @param {UnitQuaternion} quat - the orientation quaternion to be untransformed
//    * @return {UnitQuaternion} the untransformed quaternion
//    */
//   untransform_quat ( quat ) {
//     return quat.without_coordinate_convention( this.quat );
//   }
// 
//   /**
//    * Undo a transform of an orientation quaternion with this coordinate rotation in place 
//    *
//    * See `.transform_quat( ... )` for details
//    *
//    * @param {UnitQuaternion} quat - the orientation quaternion to be untransformed in place
//    * @return {undefined}
//    */
//   untransform_quat_ip ( quat ) {
//     quat.set_without_coordinate_convention( this.quat );
//   }

  /**
   * Transform an orientation quaternion's reference coordinate system
   *
   * In this construction, `quat` represents an orientation (ostensibly of an object in space).
   * It represents the orientation in the sense that we pick a cooridinate represention for this 
   * orientation called O (for example, x=right, y=forward, z=up on the object), and then pick a reference coordinate
   * system A for which O is measured against, `quat` is then the rotation of the coordinate axes of A
   * which will map them onto the coordinate axes O (A->O). `this` is a transformation from the 
   * coordinate system A to a different coordinate system B. The result of `.orient_quat( quat )` is
   * the quaternion which rotates the coordinate system B onto O (B->O), meaning that it represents
   * the same orientation, but just referencing against a different "origin". See 
   * `UnitQuaternion.with_reference` for details.
   *
   * Note, this is NOT the same thing as changing the cooridnate representation of the quaternion itself,
   * which would be: rather than having x=right on the object, now I want x=up on the object, so give me
   * the quaternion which represents this orientation, but with a different convention for how orientations
   * are described by coordinate systems. See `UnitQuaternion.with_coordinate_convention` for more details.
   *
   * @param {UnitQuaternion} quat - the quaternion representing an orientation for which the reference coordinate
   *                                system should be changed.
   * @return {UnitQuaternion} the quaternion representing the same orientation, but with the new reference coordinate
   *                          system.
   */
  orient_quat ( quat ) {
    return quat.with_reference( this.quat );
  }

  /**
   * Transform an orientation quaternion's reference coordinate system in place
   * 
   * see `.orient( ... )` for details
   *
   * @param {unitquaternion} quat - the quaternion representing an orientation for which the reference coordinate
   *                                system should be changed in place.
   * @return {undefined}
   */
  orient_quat_ip ( quat ) {
    quat.set_with_reference( this.quat );
  }

  /**
   * Undo the transform of an orientation quaternion's reference coordinate system
   * 
   * See `.orient( ... )` for details
   *
   * @param {UnitQuaternion} quat - the quaternion representing an orientation for which the reference coordinate
   *                                system should be unchanged.
   * @return {UnitQuaternion} the quaternion representing the same orientation, but with the new reference coordinate
   *                          system.
   */
  unorient_quat( quat ) {
    return quat.without_reference( this.quat );
  }

  /**
   * undo the transform of an orientation quaternion's reference coordinate system in place
   * 
   * see `.orient( ... )` for details
   *
   * @param {unitquaternion} quat - the quaternion representing an orientation for which the reference coordinate
   *                                system should be unchanged in place.
   * @return {undefined}
   */
  unorient_quat_ip ( quat ) {
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

  set_as_before( other ) {
    // shift is applied after rotation
    this.shift.set_vec(
      this.quat.unrotate(
        other.transform_vec( this.translation )
      )
    );
    this.quat.set_as_before( other.quat );
    return this;
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
