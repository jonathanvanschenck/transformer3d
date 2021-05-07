/**
 * Transformation objects for coordinate transformations of 3d vectors
 *
 * @module transform
 */


const { UnitQuaternion } = require('./quaternion.js');
const { Shift } = require('./shift.js');
const { Euclidean, EuclideanReverse } = require('./euclidean.js');


/**
 * Abstract base class for cooridnate transformation
 */
class Transform {
  constructor () {}
  compile () { return this; }
  update ( state ) { return this; }
  transform ( vec ) {}
  untransform ( vec ) {}
  transform_ip ( vec ) {}
  untransform_ip ( vec ) {}
}

class EuclideanTransform extends Transform {
  constructor () {
    this.euclidean = new Euclidean();
  }
}

class ShiftDynamicTransform extends EuclideanTransform {
  constructor ( data_key ) {
    super();
    this.data_key = data_key;
    this.setter_name = "set_vec";
  }

  update ( state ) {
    this.euclidean.shift[this.setter_name]( state[this.data_key] );
    
    return this;
  }
  
  transform ( vec ) {
    return this.euclidean.shift.shift( vec );
  }

  transform_ip ( vec ) {
    this.euclidean.shift.shift_ip( vec );
  }
  
  untransform ( vec ) {
    return this.euclidean.shift.unshift( vec );
  }

  untransform_ip ( vec ) {
    this.euclidean.shift.unshift_ip( vec );
  }
}

class ShiftStaticTransform extends ShiftDynamicTransform {
  constructor ( vec ) {
    super();
    this.euclidean.shift.set_vec( vec );
  }
  update ( state ) { return this; }
}


ROTATION_DATA_EXTRACTOR = {
  "set_axis" : ( state ) => {
    this.euclidean.quat.set_axis( state[this.data_key[0]], state[this.data_key[1]] );
    return this;
  },
  "set_vec" : ( state ) => {
    this.euclidean.quat.set_vec( state[this.data_key] );
    return this;
  },
  "set_euler" : ( state ) => {
    let obj = {
      yaw : state[this.data_key["yaw"]],
      pitch : state[this.data_key["pitch"]],
      roll : state[this.data_key["roll"]]
    };
    this.euclidean.quat.set_euler( obj );
    return this;
  }
};

class RotateDynamicTransform extends EuclideanTransform {
  constructor ( data_key, setter_name ) {
    super();
    this.data_key = data_key;
    this.setter_name = setter_name;
    this.update = this.bind(ROTATION_DATA_EXTRACTOR[setter_name]);
  }

  update ( state ) {
    this.euclidean.quat[this.setter_name]( state[this.data_key] );

    return this;
  }

  transform ( vec ) {
    return this.euclidean.quat.rotate( vec );
  }

  transform_ip ( vec ) {
    this.euclidean.quat.rotate_ip( vec );
  }

  untransform ( vec ) {
    return this.euclidean.quat.unrotate( vec );
  }

  untransform_ip ( vec ) {
    this.euclidean.quat.unrotate_ip( vec );
  }
}

class RotateStaticTransform extends RotateDynamicTransform {
  constructor ( vec_or_obj_or_angle, axis_or_null ) {
    super();
    if ( axis_or_null ) {
      this.euclidean.quat.set_axis( vec_or_obj_or_angle, axis_or_null );
    } else if ( vec_or_obj_or_angle.length === 4 ) {
      this.euclidean.quat.set_vec( vec_or_obj_or_angle );
    } else {
      this.euclidean.quat.set_euler( vec_or_obj_or_angle );
    };
  }

  update ( state ) { return this; }
}

class EuclideanCompositeTransform extends EuclideanTransform {
  constructor( first, second ) {
    super();
    this.first = first;
    this.second = second;
  }

  update ( state ) {
    this.first.update( state );
    this.second.update( state );
    
    return this;
  }

  compile () {
    this.first.compile();
    this.second.compile();
    this.euclidean.set_as_composite( this.first, this.second );
    return this;
  }

  transform ( vec ) {
    return this.euclidean.transform( vec );
  }

  transform_ip ( vec ) {
    this.euclidean.transform_ip( vec );
  }

  untransform ( vec ) {
    return this.euclidean.untransform( vec );
  }

  untransform_ip ( vec ) {
    this.euclidean.untransform_ip( vec );
  }
}

module.exports = exports = {
  Transform : Transform,
  ShiftDynamicTransform : ShiftDynamicTransform,
  ShiftStaticTransform : ShiftStaticTransform,
  RotateDynamicTransform : RotateDynamicTransform,
  RotateStaticTransform : RotateStaticTransform,
  EuclideanCompositeTransform : EuclideanCompositeTransform
};
