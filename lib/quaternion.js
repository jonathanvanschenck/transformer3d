/**
 * Quaternion objects for rotation of 3d vectors. This is double cover of SO(3), the special orthogonal
 * group in 3 dimensions.
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
 * @private
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
 * @private
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
 * Inverse of `quat_wrap`
 *
 * @private
 */
function quat_wrap_inv ( q, v_in, v_out, c ) {
  // apply quat mult to {0}+v * qinv = c
  c[0] =             + v_in[0] * q[1] + v_in[1] * q[2] + v_in[2] * q[3];
  c[1] =             + v_in[0] * q[0] - v_in[1] * q[3] + v_in[2] * q[2];
  c[2] =             + v_in[1] * q[0] - v_in[2] * q[1] + v_in[0] * q[3];
  c[3] =             + v_in[2] * q[0] - v_in[0] * q[2] + v_in[1] * q[1];
  // apply quat mult to q * c = v
  v_out[0] = q[0] * c[1] + q[1] * c[0] + q[2] * c[3] - q[3] * c[2];
  v_out[1] = q[0] * c[2] + q[2] * c[0] + q[3] * c[1] - q[1] * c[3];
  v_out[2] = q[0] * c[3] + q[3] * c[0] + q[1] * c[2] - q[2] * c[1];
}


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
 * @private
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

/**
 * Inverse of `quat_wrap_ip`
 *
 * @private
 */
function quat_wrap_ip_inv ( q, v, c ) {
  quat_wrap_inv( q, v, v, c );
};


/**
 * Get length of a 3d vector
 *
 * @private
 */
function norm3( vec ) {
  return Math.sqrt(Math.max(0,vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2]));
}

/**
 * Get norm of a quaternion vector
 *
 * @private
 */
function norm4( vec ) {
  return Math.sqrt(Math.max(0,vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2] + vec[3]*vec[3]));
}

/**
 * Cap a number at a certain precision
 *
 * @param {number} value - number to cap
 * @param {number} cap - maximum number of decimal places
 * @return {string}
 * @private
 */
function cap_precision( value, cap ) {
  let string = value.toFixed(cap)
  if ( cap === 0 ) return string;
  while (string.slice(-1) === "0") {
    string = string.slice(0,-1);
  }
  if (string.slice(-1) === ".") {
    string = string.slice(0,-1);
  }
  return string;
}

/**
 * Format float to fixed precision with sign
 *  
 * @param {number} value - number to cast to string
 * @param {number} fix - precision to fix to
 * @param {number} buffer - string length to buffer into
 * @param {boolean} drop_plus - drop leading + sign
 * @return {string}
 * @private
 */
function format( value, fix, buffer, drop_plus ) {
  let sign = value < 0 ? "- " : (drop_plus ? "" : "+ ");
  let string = `${sign}${cap_precision(Math.abs(value), fix)}`;
  if (buffer === undefined) return string;
  while (string.length < buffer) {
    string = " " + string;
  }
  return string;
}

/**
 * A quaternion class for rotating 3d vectors
 */
class UnitQuaternion {
  constructor () {
    this._qvec = [1,0,0,0];
    this._qvecinv = [1,0,0,0];
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

  /** 
   * Get vector form of quaternion inverse
   *
   * Note the convention is `[ re, i, j, k ]`
   * @return {number[]}
   */
  get qvec_inv() { return this._qvecinv; }

  /**
   * Get the json object of this quaternion
   *
   * Will return an object of the form:
   * `{ re, i, j, k }`
   *
   * @return {Object}
   */
  get json() {
    return {
      re : this.re,
      i : this.i,
      j : this.j,
      k : this.k
    }
  };
  
  /**
   * Get the angle of this quaternion's rotation
   *
   * Note, this will always be a positive angle, but when used
   * with `this.axis`, will still produce the correct rotation
   *
   * @return {number}
   */
  get angle() {
    let angle = Math.acos(Math.min(1,Math.max(-1, this._qvec[0]))) * 2;
    // Handle case where re < 0
    if (angle > Math.PI) return 2*Math.PI - angle;
    return angle;
  }

  /**
   * Get the axis of the angle this quaternion's rotation
   *
   * If the angle of rotation is 0, the default axis is [0,0,1]
   *
   * @return {number[]} normalized 3d vector of rotation
   */
  get axis() {
    let l = norm3( this._qvec.slice(1) );
    let sign = this._qvec[0] < 0 ? -1 : 1;
    if (l < 1e-9) return [0,0,sign];
    return this._qvec.slice(1).map((v) => sign * v / l)
  }

  /**
   * Get the yaw for this quaternion's orientation
   *
   * TODO : Explain convention
   *
   * @return {number[]}
   */
  get yaw() {
    return Math.atan2(
      2 * (-this.re * this.k + this.i * this.j),
      -1 + 2 * (this.re * this.re + this.j * this.j)
    )
  }

  /**
   * Get the pitch for this quaternion's orientation
   *
   * TODO : Explain convention
   *
   * @return {number[]}
   */
  get pitch() {
    return Math.asin(Math.min(1,Math.max(-1,
      2 * (this.re * this.i + this.j * this.k)
    )));
  }

  /**
   * Get the roll for this quaternion's orientation
   *
   * TODO : Explain convention
   *
   * @return {number[]}
   */
  get roll() {
    return Math.atan2(
      2 * (this.re * this.j - this.k * this.i),
      1 - 2 * (this.i * this.i + this.j * this.j)
    );
  }
  
  /**
   * Get the equivalent matrix from this quaternion
   *
   * If A is the matrix returned by this method, then
   * the matrix product `A * vec^T` is will produce
   * the same vector as `this.rotate(vec)`
   *
   * @return {Matrix} 3x3 matrix equivalent to this quaternion
   */
  get matrix() {
    let isq = this.i**2, jsq = this.j**2, ksq = this.k**2, rsq = this.re**2;
    let ri = this.re*this.i, rj = this.re*this.j, rk = this.re*this.k;
    let ij = this.i*this.j, ik = this.i*this.k, jk = this.j*this.k;
    return [
      [ isq - jsq - ksq + rsq,            2*(ij + rk),            2*(ik - rj) ],
      [           2*(ij - rk), -isq + jsq - ksq + rsq,            2*(ri + jk) ],
      [           2*(ik + rj),           2*(-ri + jk), -isq - jsq + ksq + rsq ]
    ];
  }

  /**
   * Get the equivalent inverse matrix from this quaternion
   *
   * If A is the matrix returned by this method, then
   * the matrix product `A * vec^T` is will produce
   * the same vector as `this.unrotate(vec)`
   *
   * @return {Matrix} 3x3 inverse matrix equivalent to this quaternion
   */
  get matrix_inv() {
    let isq = this.i**2, jsq = this.j**2, ksq = this.k**2, rsq = this.re**2;
    let ri = -this.re*this.i, rj = -this.re*this.j, rk = -this.re*this.k;
    let ij = this.i*this.j, ik = this.i*this.k, jk = this.j*this.k;
    return [
      [ isq - jsq - ksq + rsq,            2*(ij + rk),            2*(ik - rj) ],
      [           2*(ij - rk), -isq + jsq - ksq + rsq,            2*(ri + jk) ],
      [           2*(ik + rj),           2*(-ri + jk), -isq - jsq + ksq + rsq ]
    ];
  }


  // ----------------
  // Mutation Methods
  // ----------------

  /**
   * Update internal inverse reference
   * 
   * @private
   */
  __update_inv () {
    this._qvecinv[0] = this._qvec[0];
    this._qvecinv[1] = -this._qvec[1];
    this._qvecinv[2] = -this._qvec[2];
    this._qvecinv[3] = -this._qvec[3];
  }

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

    this.__update_inv();

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
    this.__update_inv();
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
    this.__update_inv();

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
    this.__update_inv();
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
    this.__update_inv();
  }

  /**
   * Mutate this quaternion to be the composite of `this` before `other`
   *
   * @param {UnitQuaternion} other - the 'post-applied' rotation
   * @return {this}
   */
  set_as_before( other ) {
    quat_mult( this._qvec, other.qvec, this._working_space );
    this.__set_vec( this._working_space );
  }
  
  /**
   * Mutate this quaternion to be the composite of `this` after `other`
   *
   * @param {UnitQuaternion} other - the 'pre-applied' rotation
   * @return {this}
   */
  set_as_after( other ) {
    quat_mult( other.qvec, this._qvec, this._working_space );
    this.__set_vec( this._working_space );
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
    this.__update_inv();

    return this;
  };

  /**
   * Mutate this quaternion to be reoriented with respect to another
   *
   * In this construction, `this` starts out representing the coordinate
   * transformation from the origin system to a new orientation (A->B). The `other` 
   * quaternion serves as the transformation from the original coordinate to
   * an new reference coordinate system (A->A'). This method will mutate `this`
   * so that it represents the transformation from the new reference to the new
   * orientation (A'->B).
   *
   * @param {UnitQuaternion} other - the quaternion giving the transform to the new referece
   * @return {this}
   */
  set_with_reference ( other ) {
    quat_mult( other.qvec_inv, this._qvec, this._working_space );
    this.__set_vec( this._working_space );

    return this;
  }


  /**
   * Mutate this quaternion to be oriented without respect to `other`
   *
   * This is the inverse of `.set_with_reference`
   *
   * @param {UnitQuaternion} other - the quaternion giving the old reference
   * @return {this}
   */
  set_without_reference ( other ) {
    quat_mult( other.qvec, this._qvec, this._working_space );
    this.__set_vec( this._working_space );

    return this;
  }


  /**
   * Mutate this quaternion to have new coordinate convention
   *
   * In this construction, `this` starts out representing the
   * transformation from the origin orientation to a new orientation (A->B), given
   * a particular coordinate convention (i.e. z=up, x=forward, y=left). `other`
   * quaternion serves as the transformation from one coordinate convention to another
   * coordinate convention (i.e. xyz=FLU to x'y'z'=RFU). This method will mutate `this`
   * so that it represents the same orientation transformation, but utilizing the
   * new coordinate convention (i.e. A'->B').
   *
   * @param {UnitQuaternion} other - the quaternion giving the transform to the new coordinate convention
   * @return {this}
   */
  set_with_coordinate_convention ( other ) {
    // other^-1 * this * other
    quat_mult( other.qvec_inv, this._qvec, this._working_space );
    quat_mult( this._working_space, other.qvec, this._qvec );
    this.__update_inv();

    return this;
  }


  /**
   * Mutate this quaternion to remove a coordinate convention
   *
   * This is the inverse of `.set_with_coordinate_convention`
   *
   * @param {UnitQuaternion} other - the quaternion giving the transform to the coordinate convention to remove
   * @return {this}
   */
  set_without_coordinate_convention ( other ) {
    // other * this * other^-1
    quat_mult( other.qvec, this._qvec, this._working_space );
    quat_mult( this._working_space, other.qvec_inv, this._qvec );
    this.__update_inv();

    return this;
  }



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
   * @param {number} [obj.yaw=0.0] - rotation around "up"
   * @param {number} [obj.pitch=0.0] - rotation around "right"
   * @param {number} [obj.roll=0.0] - rotation around "forward"
   * @return {UnitQuaternion}
   */
  static from_euler ({ yaw = 0.0, pitch = 0.0, roll = 0.0 }) {
    if ( typeof(yaw) !== "number" || isNaN(yaw) ) { throw new Error('yaw must be a number'); };
    if ( typeof(pitch) !== "number" || isNaN(pitch) ) { throw new Error('pitch must be a number'); };
    if ( typeof(roll) !== "number" || isNaN(roll) ) { throw new Error('roll must be a number'); };
    return (new this()).set_euler( yaw, pitch, roll );
  }

  /**
   * Construct quaterion from json object
   *
   * Note, the quaternion will be normalized if not already. At
   * least one of the configuration parameters (`re, i, j, k`)
   * must be given, otherwise the constructor will fail
   *
   * @param {Object} obj - the json object
   * @param {number} [obj.re=0.0] - the real part
   * @param {number} [obj.i=0.0] - the i component
   * @param {number} [obj.j=0.0] - the j component
   * @param {number} [obj.k=0.0] - the k component
   * @return {UnitQuaternion}
   */
  static from_json({ re = 0.0 , i = 0.0 , j = 0.0 , k = 0.0 }) {
    return this.from_vec([ re, i, j, k ]);
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
   * Compose with another quaternion, `this` after `other`
   *
   * This returns a quaternion which is equivalent
   * to first rotating by `other` and second rotating
   * by `this`.
   *
   * @param {UnitQuaternion} other - the 'pre-applied' rotation
   * @return {UnitQuaternion} - the composite rotation of `other` then `this`
   */
  after ( other ) {
    return other.mult( this );
  }

  /**
   * Compose with another quaternion, `this` before `other`
   *
   * This returns a quaternion which is equivalent
   * to first rotating by `this` and second rotating
   * by `other`.
   *
   * @param {UnitQuaternion} other - the 'post-applied' rotation
   * @return {UnitQuaternion} - the composite rotation of `this` then `other`
   */
  before ( other ) {
    return this.mult( other );
  }

  /**
   * Create the quaterion which is `this` referenced against `other`
   *
   * @param {UnitQuaternion} other - the new reference point
   * @return {UnitQuaternion} The transformation of `this` referenced against `other`
   */
  with_reference( other ) {
    let qvec = [0,0,0,0];
    quat_mult( other.qvec_inv, this._qvec, qvec);
    return (new UnitQuaternion()).set_vec( qvec );
  }

  /**
   * Create the quaterion which is `this` dereferenced against `other`
   *
   * @param {UnitQuaternion} other - the reference point to dereference
   * @return {UnitQuaternion} The transformation of `this` dereferenced against `other`
   */
  without_reference( other ) {
    let qvec = [0,0,0,0];
    quat_mult( other.qvec, this._qvec, qvec);
    return (new UnitQuaternion()).set_vec( qvec );
  }

  /**
   * Create the quaternion which is `this` with new coordinate convetion
   *
   * @param {UnitQuaternion} other - the coordinate convetion transformation
   * @return {UnitQuaternion} The new convention quaternion
   */
  with_coordinate_convention( other ) {
    let qvec = [0,0,0,0];
    // other^-1 * this * other
    quat_mult( other.qvec_inv, this._qvec, this._working_space );
    quat_mult( this._working_space, other.qvec, qvec );
    return (new UnitQuaternion()).set_vec( qvec );
  }

  /**
   * Create the quaternion which is `this` with dereferencing a coordinate convetion
   *
   * @param {UnitQuaternion} other - the coordinate convetion transformation to remove
   * @return {UnitQuaternion} The old convention quaternion
   */
  without_coordinate_convention( other ) {
    let qvec = [0,0,0,0];
    // other * this * other^-1
    quat_mult( other.qvec, this._qvec, this._working_space );
    quat_mult( this._working_space, other.qvec_inv, qvec );
    return (new UnitQuaternion()).set_vec( qvec );
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
   * Undoes a rotation of a 3d vector with this quaterion
   *
   * @param {number[]} vec - the vector to unrotate (must be length 3)
   * @return {number[]} - the unrotated vector
   */
  unrotate ( vec ) {
    let vec2 = [0,0,0];
    quat_wrap_inv( this._qvec, vec, vec2, this._working_space );
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

  /**
   * Undoes a rotation of a 3d vector with this quaternion in place
   *
   * @param {number[]} vec - the vector to unrotate in place (must be length 3)
   * @return {undefined}
   */
  unrotate_ip ( vec ) {
    quat_wrap_ip_inv( this._qvec, vec, this._working_space );
  }


  // ----------
  //  Helpers
  // ----------

  /**
   * Get an approximate string representation
   *
   * @return {string}
   */
  toString() {
    let cap = 3;
    return `${format(this.re,cap,undefined,true)} ${format(this.i,cap)}i ${format(this.j,cap)}j ${format(this.k,cap)}k`;
  }


};


module.exports = exports = {
  quat_mult : quat_mult,
  quat_wrap_ip_inv : quat_wrap_ip_inv,
  quat_wrap_inv : quat_wrap_inv,
  quat_wrap_ip : quat_wrap_ip,
  quat_wrap : quat_wrap,
  UnitQuaternion : UnitQuaternion,
  format : format
};
