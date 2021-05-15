/**
 * A module for modeling networks of coordintate axes, and the transformations betwen them
 *
 * @module network
 */


const { Euclidean } = require('./euclidean.js');

/**
 * A coordinate system class
 *
 * Instances of this class functions as the nodes of the network graph
 *
 * This is an internal object, and is not intended to be used externally
 * @private
 */
class CoordinateSystem {
  constructor ( name ) {
    this.name = name;
    this.neighbors = {};
    this.transforms = {};

    // On init, this CS can get to itself
    //  by taking no steps, can can get
    //  to no one else
    this.downstream = {};
    this.downstream[name] = [];
  }

  attach_neighbor ( other, transform, one_way ) {
    this.neighbors[ other.name ] = other;
    this.transforms[ other.name ] = transform;
    // If attaching neighbor, it is garenteed to be
    //  closer via this transform than any other path
    //  so is is safe to just write over the stream
    //  without checking
    this.downstream[ other.name ] = [ other.name ];
    if ( !one_way ) { other.attach_neighbor( this, transform.inv, true ); };
  }

  discover_downstream_for ( name ) {
    let stream = this.__query_neighbors_for( name, [] );
    if (stream === undefined) { return undefined };
    stream.shift();
    let cur_stream = this.downstream[name];
    if (cur_stream === undefined || cur_stream.length > stream.length) { 
      this.downstream[name] = stream;
    }
    return this;
  }

  __query_neighbors_for ( name, exclude ) {
    
    // Fast returns if this is the system you are
    // looking for
    if ( this.name == name ) return [ name ];

    // Prevent back tracking, no search from here
    //  should ever return here
    exclude.push( this.name );
    
    // Get the current downstream (if any)
    let stream = this.downstream[name];

    // Check for the best possible path
    let new_stream;
    for (let system of Object.values(this.neighbors)) {
      // Don't revisit neighbors already searched
      if ( exclude.includes( system.name ) ) { continue; }

      // Ask neighbor for their best possible path if any
      //   Need to give the recusive call a copy of the current
      //   list so that networks with loops will always try to 
      //   explore both paths around the loop
      new_stream = system.__query_neighbors_for( name, new Array(...exclude) );
    

      // Bail on this neighbor if they don't have a stream
      if ( new_stream === undefined ) { continue; }

      // update overall 'best' stream with this neighbor's best
      if ( stream === undefined || stream.length > new_stream.length) {
        stream = new_stream;
      }
    }

    // Set and return the best path, if any was found
    if ( stream !== undefined ) {
      this.downstream[name] = new Array(...stream); // need to copy here, so next line work
      stream.unshift( this.name );
    }
    return stream;
  }

  __stream_or_error( name ) {
    let stream = this.downstream[name];
    if (stream === undefined) { throw new Error(`Coordinate system '${this.name}' cannot find '${name}'`); }
    return stream;
  }

  transform_quat_to ( quat, name ) {
    let _quat = quat;
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      // Transform the quaternion
      _quat = system.transforms[ _name ].transform_quat( _quat );
      // Update the system reference in preperation for
      //  the next transform_quatation
      system = system.neighbors[ _name ];
    }
    return _quat;
  }

  transform_quat_to_ip ( quat, name ) {
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      system.transforms[ _name ].transform_quat_ip( quat );
      system = system.neighbors[ _name ];
    }
  }

  transform_vec_to ( vec, name ) {
    let _vec = vec;
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      // Transform the vector
      _vec = system.transforms[ _name ].transform_vec( _vec );
      // Update the system reference in preperation for
      //  the next transform_vecation
      system = system.neighbors[ _name ];
    }
    return _vec;
  }

  transform_vec_to_ip ( vec, name ) {
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      system.transforms[ _name ].transform_vec_ip( vec );
      system = system.neighbors[ _name ];
    }
  }

  orient_to ( quat, name ) {
    let _quat = quat;
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      // Transform the quaternion
      _quat = system.transforms[ _name ].orient( _quat );
      // Update the system reference in preperation for
      //  the next transform_vecation
      system = system.neighbors[ _name ];
    }
    return _quat;
  }
  orient_to_ip ( quat, name ) {
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      system.transforms[ _name ].orient_ip( quat );
      system = system.neighbors[ _name ];
    }
  }

  get_euclidean_transform_to( name ) {
    let euc = new Euclidean();
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      if (!system.transforms[ _name ].is_euclidean) throw new Error(`Transform ${system.name} to ${_name} is non euclidean`);
      // HACK : need to access the full euclidean objects, so if this is an backward
      //        transform, then we need to generate the inverse object (using euclidean.get_inv())
      if ( system.transforms[ _name ].is_inverse ) {
        // Generate the inverse euclidean transform object
        euc.set_as_before(system.transforms[ _name ].euclidean());
      } else {
        euc.set_as_before(system.transforms[ _name ].euclidean);
      }
      system = system.neighbors[ _name ];
    }
    return euc;
  }

  update ( state ) {
    for ( let transform of Object.values( this.transforms ) ) {
      transform.update( state );
    }
    return this;
  }
}

/**
 * A coordinate system network class
 *
 * Instances of this class function as the graph of the various
 * coordinate systems (nodes) and transformations between them (edges)
 *
 * The common workfollow for using this class is to:
 *    1) Create the instance
 *    2) Specify all the coordinate system transformations (`.connect_systems(...)`)
 *    3) Generate the shortest "path" between each system pair (`.compile()`)
 *    4) Update any transform's dynamic data (`.update(state)`)
 *    5) Apply transformations to vectors and quaternions
 *    6) Repeat 4 and 5 as necessary.
 *
 * ```javascript
 * // 1
 * const net = new CoordinateNetwork();
 *
 * // 2
 * net.connect_systems("A", new transform.ShiftDynamicTransform("A_to_B"), "B");
 * net.connect_systems("B", new transform.ShiftStaticTransform([1,0,0]), "C" );
 *
 * // 3
 * net.compile();
 *
 * // 4
 * net.update({ A_to_B: [-1, 0, 0] });
 *
 * // 5
 * net.transform_vec([0,0,0], "A", "C"); // returns [0,0,0];
 *
 * // 6
 * net.update({ A_to_B: [1, 0, 0] });
 * net.transform_vec([0,0,0], "A", "C"); // returns [2,0,0];
 * ```
 */
class CoordinateNetwork {
  /**
   * Constructor
   */
  constructor () { this.systems = {} }

  /**
   * Connect two coordinate systems with a transformation
   *
   * Note, that the names provided to this method `first` and `second`
   * should be unique, since this method assumes that if it is called
   * with a particular name twice, it is because that system is connected
   * to two other systems.
   *
   * If a provided name doesn't yet coorespond to an existing coordinate
   * system, it is created.
   *
   * @param {string} first - the name of the first coordinate system
   * @param {Tranform} tranform - the transformation from coordinate
   * system `first` to coordinate systems `second`
   * @param {string} second - the name of the second coordinate system
   * @param {bool|undefined} [one_way=undefined] - specifies if the transformation
   * is 'one way' (meaning that either `transform.untransform` doesn't exist,
   * or there is some other reason why `second` cannot be back converted into
   * `first`). Default is `undefined` meaning that the transformation is
   * assumed to be two-way.
   * @return {this}
   */
  connect_systems ( first, transform, second, one_way ) {
    let start = this.systems[first]
    if (start === undefined) {
      start = this.systems[first] = new CoordinateSystem(first);
    }
    let end = this.systems[second]
    if (end === undefined) {
      end = this.systems[second] = new CoordinateSystem(second);
    }
    start.attach_neighbor( end, transform, one_way );

    return this;
  }
  
  /**
   * Generate all inter-coordinate-system transformations
   *
   * This method is intended to be called after all the
   * various coordinate transformations (edges) are specified,
   * and it will then recusively discover the shortest path
   * between every pair of coordinate systems
   *
   * This should only be called once.
   *
   * @return {this}
   */
  compile () {
    // Walk the whole network to discover the shortest
    //  streams for each pair of systems
    for (let system of Object.values( this.systems )) {
      for (let name of Object.keys( this.systems )) {
        system.discover_downstream_for( name );
      }
    }

    return this;
  }

  /**
   * Update the dynamic data for internal transformations
   *
   * @param {Object} state - object containing any relevent
   * dynamic data for dynamic transformation objects
   * @return {this}
   */
  update ( state ) {
    for ( let system of Object.values( this.systems ) ) {
      system.update( state );
    }
    return this;
  }

  /**
   * Get the coordinate system with this name, or throw an error
   *
   * This is meant for internal use, to standardize the error throwing
   * when a coordinate system cannot be found
   *
   * @param {string} name - the name of the coordinate system
   * @throws {Error} if the coordinate system cannot be found with name `name`
   * @return {CoordinateSystem}
   * @private
   */
  __system_or_error( name ) {
    let system = this.systems[name];
    if (system === undefined) { throw new Error(`Coordinate network cannot find system '${name}'`); }
    return system;
  }

  /**
   * Transform an orientation quaternion from `start` to `end`
   *
   * @param {UnitQuaternion} quat - the orientation quaternion to transform
   * @param {string} start_name - the name of the coordinate system that `quat`
   * originates within
   * @param {string} end_name - the name of the coordinate system that `quat`
   * should be transformed into
   * @return {UnitQuaternion} the orientation quaternion in the transformed
   * coordinate system.
   */
  transform_quat ( quat, start_name, end_name ) { 
    return this.__system_or_error( start_name ).transform_quat_to( quat, end_name );
  }
  /**
   * Transform an orientation quaternion from `start` to `end` in place
   *
   * @param {UnitQuaternion} quat - the orientation quaternion to transform in place
   * @param {string} start_name - the name of the coordinate system that `quat`
   * originates within
   * @param {string} end_name - the name of the coordinate system that `quat`
   * should be transformed into
   * @return {undefined}
   */
  transform_quat_ip ( quat, start_name, end_name ) {
    this.__system_or_error( start_name ).transform_quat_to_ip( quat, end_name );
  }

  /**
   * Transform a vector from `start` to `end`
   *
   * @param {number[]} vec - the 3d vector to transform
   * @param {string} start_name - the name of the coordinate system that `vec`
   * originates within
   * @param {string} end_name - the name of the coordinate system that `vec`
   * should be transformed into
   * @return {number[]} the 3d vector in the transformed coordinate system
   */
  transform_vec ( vec, start_name, end_name ) { 
    return this.__system_or_error( start_name ).transform_vec_to( vec, end_name );
  }
  /**
   * Transform a vector from `start` to `end` in place
   *
   * @param {number[]} vec - the 3d vector to transform in place
   * @param {string} start_name - the name of the coordinate system that `vec`
   * originates within
   * @param {string} end_name - the name of the coordinate system that `vec`
   * should be transformed into
   * @return {undefined}
   */
  transform_vec_ip ( vec, start_name, end_name ) {
    this.__system_or_error( start_name ).transform_vec_to_ip( vec, end_name );
  }

  _get_euclidean_transform( start_name, end_name ) {
    return this.__system_or_error( start_name ).get_euclidean_transform_to( end_name );
  }

  /**
   * Get the effective affine transformation from `start` to `end`
   *
   * If all the transformations between `start` and `end` are Euclidean-type,
   * then the total transformation can be expressed as a single Euclidean
   * transformation. This method returns the affine transformation which
   * is equivalent to that total Euclidean transformation. The form of 
   * the affine transformation is `A * vec^T + b^T`, where `vec` is the
   * 3d vector is `start` coordinates, and the result is the same vector
   * in `end` coordinates.
   *
   * Format:
   * ```json
   * {
   *     "A" : "3x3 matrix",
   *     "b" : "3d vector"
   * }
   * ```
   *
   * @param {string} start_name - the name of the coordinate system that the 
   * transform originates in
   * @param {string} end_name - the name of the coordinate system that the 
   * transform ends in
   * @throws {Error} if any internal transformations are NOT Euclidean-type
   * then this method will fail, since there is no garentee that a
   * non-Euclidean-type transformation can be expressed as an affine tranform
   * (though many can).
   * @return {Object}
   */
  get_affine( start_name, end_name ) {
    return this._get_euclidean_transform( start_name, end_name ).affine;
  }

  orient ( quat, start_name, end_name ) {
    return this.__system_or_error( start_name ).orient_to( quat, end_name );
  }
  orient_ip ( quat, start_name, end_name ) {
    this.__system_or_error( start_name ).orient_to_ip( quat, end_name );
  }
}

module.exports = exports = {
  CoordinateSystem : CoordinateSystem,
  CoordinateNetwork : CoordinateNetwork
}
