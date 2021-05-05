/**
 * Quaternion objects for rotation of 3d vectors
 * 
 * @module quaternion
 */


/**
 * Apply quaternion multipliction
 *
 * Note, this function will write into `c` the result of `a*b`. The 
 * convention is `[ re, i, j, k ]`.
 *
 * @param {number[]} a - quaternion vector multiplier (must be length 4)
 * @param {number[]} b - quaternion vector multiplicand (must be length 4)
 * @param {number[]} c - quaternion vector product (must be length 4)
 * @return {undefined}
 */
function quat_mult( a, b, c ) {
  c[0] = a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3];
  c[1] = a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2];
  c[2] = a[0] * b[2] + a[2] * b[0] + a[3] * b[1] - a[1] * b[3];
  c[3] = a[0] * b[3] + a[3] * b[0] + a[1] * b[2] - a[2] * b[1];
};


/**
 * Apply a quaternion rotation to a vector
 *
 * Note that both `v_out` and `c` are mutated by this fuction. This
 * function writes into `v_out` the result of `q^-1 * [0,v_in] * q`.
 * The conventions are `[ re, i, j, k]` for quaternion vectors 
 * and `[ x, y, z ]` for 3d vectors
 *
 * @param {number[]} q - unit quaterion to rotate with (must be length 4, and normalized)
 * @param {number[]} v_out - 3d vector to rotate (must be length 3)
 * @param {number[]} v_in - rotated 3d vector (must be length 3)
 * @param {number[]} c - working space for operation (must be length 4)
 * @return {undefined}
 */
function quat_wrap ( q, v_in, v_out, c ) {
  // apply quat mult to {0}+v * q = c
  c[0] =             - v_in[0] * q[1] - v_in[1] * q[2] - v_in[2] * q[3];
  c[1] =             + v_in[0] * q[0] + v_in[1] * q[3] - v_in[2] * q[2];
  c[2] =             + v_in[1] * q[0] + v_in[2] * q[1] - v_in[0] * q[3];
  c[3] =             + v_in[2] * q[0] + v_in[0] * q[2] - v_in[1] * q[1];
  // apply quat mult to qinv * c = v
  v_out[0] = q[0] * c[1] - q[1] * c[0] - q[2] * c[3] + q[3] * c[2];
  v_out[1] = q[0] * c[2] - q[2] * c[0] - q[3] * c[1] + q[1] * c[3];
  v_out[2] = q[0] * c[3] - q[3] * c[0] - q[1] * c[2] + q[2] * c[1];
};


/**
 * Apply a quaternion rotation to a vector in place
 *
 * Note that both `v` and `c` are mutated by this fuction. This
 * function writes into `v` the result of `q^-1 * [0,v] * q`.
 * The conventions are `[ re, i, j, k]` for quaternion vectors 
 * and `[ x, y, z ]` for 3d vectors
 *
 * @param {number[]} q - unit quaterion to rotate with (must be length 4)
 * @param {number[]} v - 3d vector to rotate in place (must be length 3)
 * @param {number[]} c - working space for operation (must be length 4)
 * @return {undefined}
 */
function quat_wrap_ip ( q, v, c ) {
  quat_wrap( q, v, v, c );
  // // apply quat mult to {0}+v * q = c
  // c[0] =             - v[0] * q[1] - v[1] * q[2] - v[2] * q[3];
  // c[1] =             + v[0] * q[0] + v[1] * q[3] - v[2] * q[2];
  // c[2] =             + v[1] * q[0] + v[2] * q[1] - v[0] * q[3];
  // c[3] =             + v[2] * q[0] + v[0] * q[2] - v[1] * q[1];
  // // apply quat mult to qinv * c = v
  // v[0] = q[0] * c[1] - q[1] * c[0] - q[2] * c[3] + q[3] * c[2];
  // v[1] = q[0] * c[2] - q[2] * c[0] - q[3] * c[1] + q[1] * c[3];
  // v[2] = q[0] * c[3] - q[3] * c[0] - q[1] * c[2] + q[2] * c[1];
};

function norm3( vec ) {
  return Math.sqrt(Math.max(0,vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2]));
}

function norm4( vec ) {
  return Math.sqrt(Math.max(0,vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2] + vec[3]*vec[3]));
}

/**
 * A quaternion class for rotating 3d vectors
 */
class UnitQuaternion {
  constructor () {
    this._qvec = [1,0,0,0];
    this._working_space = [0,0,0,0];
  }

  /** 
   * Get real part of quaternion
   *
   * @return {number}
   */
  get re() { return this._qvec[0]; }

  /** 
   * Get i component of quaternion
   *
   * @return {number}
   */
  get i() { return this._qvec[1]; }

  /** 
   * Get j component of quaternion
   *
   * @return {number}
   */
  get j() { return this._qvec[2]; }

  /** 
   * Get k component of quaternion 
   *
   * @return {number}
   */
  get k() { return this._qvec[3]; }

  /** 
   * Get vector form of quaternion
   *
   * Note the convention is `[ re, i, j, k ]`
   * @return {number[]}
   */
  get qvec() { return this._qvec; }


  // ----------------
  // Mutation Methods
  // ----------------
  /**
   * Set the quaternion from a vector
   *
   * Note that the quaternion will be normalized if it is not already.
   * Also, the convetion is `[ re, i, j, k ]`
   *
   * @param {number[]} qvec - the quaternion vector (must be length 4 and nonzero)
   * @return {this}
   */
  set_vec ( qvec ) {
    let norm = norm4( qvec );
    if ( norm < 1e-9 ) throw new Error('Quaternions must be normalized');
    this._qvec[0] = qvec[0]/norm;
    this._qvec[1] = qvec[1]/norm;
    this._qvec[2] = qvec[2]/norm;
    this._qvec[3] = qvec[3]/norm;

    return this;
  }

  /**
   * Set the quaternion vector (does not renormalize)
   *
   * @private
   */
  __set_vec ( normalized_qvec ) {
    this._qvec[0] = normalized_qvec[0];
    this._qvec[1] = normalized_qvec[1];
    this._qvec[2] = normalized_qvec[2];
    this._qvec[3] = normalized_qvec[3];
  }

  /**
   * Set angle and rotational axis
   *
   * Note that the provided vector will be normalized if it is not already.
   *
   * @param {number} angle - the angle (in rad) of rotation
   * @param {number[]} vec - the vector to rotate around (must be length 3 and nonzero)
   * @return {this}
   */
  set_axis ( angle, vec ) {
    let norm = norm3( vec );
    if ( norm < 1e-9 ) throw new Error('Quaternions must be normalized');

    let cos = Math.cos( angle / 2.0 );
    let sin = Math.sin( angle / 2.0 );

    this._qvec[0] = cos;
    this._qvec[1] = vec[0] * sin / norm;
    this._qvec[2] = vec[1] * sin / norm;
    this._qvec[3] = vec[2] * sin / norm;

    return this;
  }

  /**
   * Set angle and rotational axis (does not renormalize)
   *
   * @private
   */
  __set_axis ( angle, normalized_vec ) {
    let cos = Math.cos( angle / 2.0 );
    let sin = Math.sin( angle / 2.0 );

    this._qvec[0] = cos;
    this._qvec[1] = normalized_vec[0] * sin;
    this._qvec[2] = normalized_vec[1] * sin;
    this._qvec[3] = normalized_vec[2] * sin;
  }

  /**
   * Set euler angles of rotation
   *
   * @param {number} yaw - rotation around "up"
   * @param {number} pitch - rotation around "right"
   * @param {number} roll - rotation around "forward"
   * @return {this}
   */
  set_euler ( yaw, pitch, roll ) {
    this.__set_euler( yaw, pitch, roll );

    return this;
  }

  /**
   * Set euler angles of rotation
   * 
   * @private
   */
  __set_euler ( yaw, pitch, roll ) {
    let sy = Math.sin( yaw / 2.0 );
    let cy = Math.cos( yaw / 2.0 );
    let sp = Math.sin( pitch / 2.0 );
    let cp = Math.cos( pitch / 2.0 );
    let sr = Math.sin( roll / 2.0 );
    let cr = Math.cos( roll / 2.0 );

    this._qvec[0] =   sp*sr*sy + cp*cr*cy;
    this._qvec[1] =   sp*cr*cy + sr*sy*cp;
    this._qvec[2] = - sp*sy*cr + sr*cp*cy;
    this._qvec[3] =   sp*sr*cy - sy*cp*cr;
  }
  
  /**
   * Mutate this quaternion to be the composite of two quaternions
   *
   * @param {UnitQuaternion} first - the quaternion to apply first in rotation
   * @param {UnitQuaternion} second - the quaternion to apply second in rotation
   * @return {this}
   */
  set_as_composite( first, second ) {
    quat_mult( first.qvec, second.qvec, this._qvec );

    return this;
  };



  // --------------------
  // Construction Methods
  // --------------------

  /**
   * Construct quaternion from a 4d vector
   *
   * Note, the quaternion is normalized if not already. And the
   * convention is `[ re, i, j, k ]`.
   *
   * @param {number[]} qvec - the vector to construct with (must be length 4 and nonzero)
   * @return {UnitQuaternion}
   */
  static from_vec ( qvec ) {
    if ( qvec.length !== 4 ) { throw new Error('argument must be 4d vector'); };
    return (new this()).set_vec( qvec );
  }

  /**
   * Construct quaternion from an angle and rotational axis
   *
   * Note, the rotational axis is normalized if not already
   *
   * @param {number} angle - the rotational angle (in radians)
   * @param {number[]} vec - the vector to rotate around (must be length 3 and nonzero)
   * @return {UnitQuaternion}
   */
  static from_axis ( angle, vec ) {
    if ( typeof(angle) !== "number" || isNaN(angle) ) { throw new Error('angle must be a number'); };
    if ( vec.length !== 3 ) { throw new Error('argument must be a 3d vector'); };
    return (new this()).set_axis( angle, vec );
  }

  /**
   * Constrcut quaterion from euler angles
   *
   * TODO : explain sign convention
   *
   * @param {Object} obj - object containing euler angles
   * @param {number} obj.yaw - rotation around "up"
   * @param {number} obj.pitch - rotation around "right"
   * @param {number} obj.roll - rotation around "forward"
   * @return {UnitQuaternion}
   */
  static from_euler ({ yaw = 0.0, pitch = 0.0, roll = 0.0 }) {
    if ( typeof(yaw) !== "number" || isNaN(yaw) ) { throw new Error('yaw must be a number'); };
    if ( typeof(pitch) !== "number" || isNaN(pitch) ) { throw new Error('pitch must be a number'); };
    if ( typeof(roll) !== "number" || isNaN(roll) ) { throw new Error('roll must be a number'); };
    return (new this()).set_euler( yaw, pitch, roll );
  }



  // ----------
  // Operations
  // ----------
 
  /**
   * Multiply with another quaternion
   *
   * Note that this is right multiplication, so that `this` is the
   * multiplier and `other` is the multiplicand.
   *
   * @param {UnitQuaternion} other - the multiplicand
   * @return {UnitQuaternion}
   */
  mult ( other ) {
    let qvec = [0,0,0,0];
    quat_mult(this.qvec, other.qvec, qvec);
    return (new UnitQuaternion()).set_vec( qvec );
  }

  /**
   * Compose with another quaternion
   *
   * This returns a quaternion which is equivalent
   * to first rotating by `this` and second rotating
   * by `other`.
   *
   * @param {UnitQuaternion} other - the second rotation to apply
   * @return {UnitQuaternion} - the composite rotation
   */
  then ( other ) {
    return this.mult( other );
  }

  /**
   * Rotate a 3d vector with this quaternion
   *
   * @param {number[]} vec - the vector to rotate (must be length 3)
   * @return {number[]} - the rotated vector
   */
  rotate ( vec ) {
    let vec2 = [0,0,0];
    quat_wrap( this._qvec, vec, vec2, this._working_space );
    return vec2;
  }

  /**
   * Rotate a 3d vector with this quaternion in place
   *
   * @param {number[]} vec - the vector to rotate in place (must be length 3)
   * @return {undefined}
   */
  rotate_ip ( vec ) {
    quat_wrap_ip( this._qvec, vec, this._working_space );
  }


};


module.exports = exports = {
  quat_mult : quat_mult,
  quat_wrap_ip : quat_wrap_ip,
  quat_wrap : quat_wrap,
  UnitQuaternion : UnitQuaternion
};