/**
 * Shift objects for shifting 3d vectors. This is single cover of T(3), the translation group in 3 dimensions.
 *
 * @module shift
 */

/**
 * Apply a shift to a vector
 *
 * Note that the vector `v_out` is mutated by this function
 *
 * @param {number[]} s - 3d vector to shift with (must be length 3)
 * @param {number[]} v_out - 3d vector to be shifted (must be length 3)
 * @param {number[]} v_in - shifted 3d vector (must be length 3)
 * @return {undefined}
 * @private
 */
function shift_vec ( s, v_in, v_out ) {
  v_out[0] = s[0] + v_in[0];
  v_out[1] = s[1] + v_in[1];
  v_out[2] = s[2] + v_in[2];
};

/**
 * Inverse of `shift_vec`
 *
 * @private
 */
function shift_vec_inv ( s, v_in, v_out ) {
  v_out[0] = v_in[0] - s[0];
  v_out[1] = v_in[1] - s[1];
  v_out[2] = v_in[2] - s[2];
};

/**
 * Apply a shift to a vector in place
 *
 * Note that the vector `v` is mutated by this function.
 *
 * @param {number[]} s - 3d vector to shift with (must be length 3)
 * @param {number[]} v - 3d vector to be shifted in place (must be length 3)
 * @return {undefined}
 * @private
 */
function shift_vec_ip ( s, v ) {
  shift_vec( s, v, v );
};

/**
 * Inverse of `shift_vec_ip`
 *
 * @private
 */
function shift_vec_ip_inv ( s, v ) {
  shift_vec_inv( s, v, v );
};


/**
 * A shift object for shifting 3d vectors
 */
class Shift {
  constructor () {
    this._vec = [ 0, 0, 0 ];
  }
  
  /**
   * Get the shift vector
   *
   * @return {number[]}
   */
  get vec() { return this._vec; }


  // ----------------
  // Mutation Methods
  // ----------------

  /**
   * Set the shift vector
   *
   * @param {number[]} vec - vector to shift with (must be length 3)
   * @return {this}
   */
  set_vec ( vec ) {
    if ( vec.length !== 3 ) throw new Error('vectors must be length 3');
    this.__set_vec( vec );

    return this;
  }

  /**
   * Set the shift vector (no error checking)
   *
   * @private
   */
  __set_vec ( vec ) {
    this._vec[0] = vec[0];
    this._vec[1] = vec[1];
    this._vec[2] = vec[2];
  }


  /**
   * Mutate this shift to be the composite of two shifts
   *
   * @param {Shift} first - the shift to apply first
   * @param {Shift} second - the shift to apply second
   * @return {this}
   */
  set_as_composite( first, second ) {
    shift_vec( first.vec, second.vec, this._vec );

    return this;
  }


  // ----------
  // Operations
  // ----------
  
  /**
   * Add this shift with another shift
   *
   * @param {Shift} other - the other shift to compose with
   * @return {Shift} the resultant composite shift
   */
  add ( other ) {
    let vec = [ 0, 0, 0 ];
    shift_vec( this._vec, other.vec, vec );
    return (new Shift()).set_vec( vec );
  }

  /**
   * Alias for `.add`
   * 
   * @param {Shift} other - the other shift to compose with
   * @return {Shift} the resultant composite shift
   */
  after ( other ) {
    return this.add( other );
  }


  /**
   * Shift a 3d vector
   *
   * @param {number[]} vec - the vector to shift (must be length 3)
   * @return {number[]} the shifted vector
   */
  shift ( vec ) {
    let nvec = [ 0, 0, 0 ];
    shift_vec( this._vec, vec, nvec );
    return nvec;
  }

  /**
   * Shift a 3d vector in place
   *
   * @param {number[]} vec - the vector to shift in place (must be length 3)
   * @return {undefined}
   */
  shift_ip ( vec ) {
    shift_vec_ip( this._vec, vec );
  }

  /**
   * Undo the shift of a 3d vector
   *
   * @param {number[]} vec - the vector to unshift (must be length 3)
   * @return {number[]} the unshifted vector
   */
  unshift ( vec ) {
    let nvec = [ 0, 0, 0 ];
    shift_vec_inv ( this._vec, vec, nvec );
    return nvec;
  }

  /**
   * Undo the shift of a 3d vector in place
   *
   * @param {number[]} vec - the vector to unshift (must be length 3)
   * @return {undefined}
   */
  unshift_ip ( vec ) {
    shift_vec_ip_inv ( this._vec, vec );
  }



  // --------------------
  // Construction Methods
  // --------------------

  /**
   * Construct a shift from a vector
   *
   * @param {number[]} vec - vector to shift with (must be length 3)
   * @return {Shift}
   */
  static from_vec( vec ) {
    return (new this()).set_vec( vec );
  }
}


module.exports = exports = {
  shift_vec : shift_vec,
  shift_vec_inv : shift_vec_inv,
  shift_vec_ip : shift_vec_ip,
  shift_vec_ip_inv : shift_vec_ip_inv,
  Shift : Shift
};
