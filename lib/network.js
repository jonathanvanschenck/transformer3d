// const { CompositeTransform, EuclideanCompositeTransform } = require('./transform.js');

// Node
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

  transform_to ( vec, name ) {
    let _vec = vec;
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      // Transform the vector
      _vec = system.transforms[ _name ].transform( _vec );
      // Update the system reference in preperation for
      //  the next transformation
      system = system.neighbors[ _name ];
    }
    return _vec;
  }

  transform_to_ip ( vec, name ) {
    let system = this;
    for ( let _name of this.__stream_or_error( name )) {
      system.transforms[ _name ].transform_ip( vec );
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
      //  the next transformation
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

  update ( state ) {
    for ( let transform of Object.values( this.transforms ) ) {
      transform.update( state );
    }
    return this;
  }
}


class CoordinateNetwork {
  constructor () { this.systems = {} }

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

  update ( state ) {
    for ( let system of Object.values( this.systems ) ) {
      system.update( state );
    }
    return this;
  }

  __system_or_error( name ) {
    let system = this.systems[name];
    if (system === undefined) { throw new Error(`Coordinate network cannot find system '${name}'`); }
    return system;
  }

  transform ( vec, start_name, end_name ) { 
    return this.__system_or_error( start_name ).transform_to( vec, end_name );
  }
  transform_ip ( vec, start_name, end_name ) {
    this.__system_or_error( start_name ).transform_to_ip( vec, end_name );
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
