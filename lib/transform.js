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

  update ( state ) { return this; }

  transform ( vec ) { return vec; }
  untransform ( vec ) { return vec; }
  transform_ip ( vec ) {}
  untransform_ip ( vec ) {}

  orient ( quat ) { return quat; }
  unorient ( quat ) { return quat; }
  orient_ip ( quat ) {}
  unorient_ip ( quat ) {}
}

const EuclideanReverseTransformMixin = (Sub) => class extends Sub {
  constructor () {
    super();
    this.euclidean = new EuclideanReverse();
  }

  transform ( vec ) { return this.euclidean.transform( vec ); }
  untransform ( vec ) { return this.euclidean.untransform( vec ); }
  transform_ip ( vec ) { this.euclidean.transform_ip( vec ); }
  untransform_ip ( vec ) { this.euclidean.untransform_ip( vec ); }

  orient ( quat ) { return this.euclidean.orient( quat ); }
  unorient ( quat ) { return this.euclidean.unorient( quat ); }
  orient_ip ( quat ) { this.euclidean.orient_ip( quat ); }
  unorient_ip ( quat ) { this.euclidean.unorient_ip( quat ); }
}

const EuclideanTransformMixin = (Sub) => class extends Sub {
  constructor () {
    super();
    this.euclidean = new Euclidean();
  }

  transform ( vec ) { return this.euclidean.transform( vec ); }
  untransform ( vec ) { return this.euclidean.untransform( vec ); }
  transform_ip ( vec ) { this.euclidean.transform_ip( vec ); }
  untransform_ip ( vec ) { this.euclidean.untransform_ip( vec ); }

  orient ( quat ) { return this.euclidean.orient( quat ); }
  unorient ( quat ) { return this.euclidean.unorient( quat ); }
  orient_ip ( quat ) { this.euclidean.orient_ip( quat ); }
  unorient_ip ( quat ) { this.euclidean.unorient_ip( quat ); }
}

class EuclideanReverseStaticTransform extends EuclideanReverseTransformMixin(Transform) {
  constructor ( qvec, vec ) {
    super();
    this.euclidean.set_vecs( qvec, vec );
  }
}
class EuclideanStaticTransform extends EuclideanTransformMixin(Transform) {
  constructor ( qvec, vec ) {
    super();
    this.euclidean.set_vecs( qvec, vec );
  }
}

class ShiftDynamicTransform extends EuclideanTransformMixin(Transform) {
  constructor ( data_key ) {
    super();
    this.data_key = data_key;
    this.setter_name = "set_vec";
  }

  update ( state ) {
    this.euclidean.shift[this.setter_name]( state[this.data_key] );
    
    return this;
  }
  
  transform ( vec ) { return this.euclidean.shift.shift( vec ); }
  untransform ( vec ) { return this.euclidean.shift.unshift( vec ); }
  transform_ip ( vec ) { this.euclidean.shift.shift_ip( vec ); }
  untransform_ip ( vec ) { this.euclidean.shift.unshift_ip( vec ); }

  orient ( quat ) { return quat; }
  unorient ( quat ) { return quat; }
  orient_ip ( quat ) {}
  unorient_ip ( quat ) {}
}

class ShiftStaticTransform extends ShiftDynamicTransform {
  constructor ( vec ) {
    super();
    this.euclidean.shift.set_vec( vec );
  }
  update ( state ) { return this; }
}


ROTATION_DATA_EXTRACTOR = {
  undefined : ( state ) => { return this; },
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

class RotateDynamicTransform extends EuclideanTransformMixin(Transform) {
  constructor ( data_key, setter_name ) {
    super();
    this.data_key = data_key;
    this.setter_name = setter_name;
    
    // overwrite update method with arrow function
    this.update = (ROTATION_DATA_EXTRACTOR[setter_name]).bind(this);
  }

  transform ( vec ) { return this.euclidean.quat.rotate( vec ); }
  untransform ( vec ) { return this.euclidean.quat.unrotate( vec ); }
  transform_ip ( vec ) { this.euclidean.quat.rotate_ip( vec ); }
  untransform_ip ( vec ) { this.euclidean.quat.unrotate_ip( vec ); }

  orient ( quat ) { return this.euclidean.orient( quat ); }
  unorient ( quat ) { return this.euclidean.unorient( quat ); }
  orient_ip ( quat ) { this.euclidean.orient_ip( quat ); }
  unorient_ip ( quat ) { this.euclidean.unorient_ip( quat ); }
}

class RotateStaticTransform extends RotateDynamicTransform {
  constructor ( vec_or_obj_or_angle, axis_or_null ) {
    super(); // sets data_key and setter_name to undefined
    if ( axis_or_null ) {
      this.euclidean.quat.set_axis( vec_or_obj_or_angle, axis_or_null );
    } else if ( vec_or_obj_or_angle.length === 4 ) {
      this.euclidean.quat.set_vec( vec_or_obj_or_angle );
    } else {
      this.euclidean.quat.set_euler( vec_or_obj_or_angle );
    };
  }
}

const CompositeTransformMixin = (Sub) => class extends Sub {
  constructor ( first, second ) {
    super();
    this.first = first;
    this.second = second;
  }

  update ( state ) {
    super.update( state );

    this.first.update( state );
    this.second.update( state );
    
    return this;
  }
}

class EuclideanCompositeTransform extends CompositeTransformMixin(EuclideanTransformMixin(Transform)) {
  update ( state ) {
    super.update( state );
    this.euclidean.set_as_composite( this.first.euclidean, this.second.euclidean );
    return this;
  }
}

module.exports = exports = {
  Transform : Transform,
  ShiftDynamicTransform : ShiftDynamicTransform,
  ShiftStaticTransform : ShiftStaticTransform,
  RotateDynamicTransform : RotateDynamicTransform,
  RotateStaticTransform : RotateStaticTransform,
  EuclideanStaticTransform : EuclideanStaticTransform,
  EuclideanReverseStaticTransform : EuclideanReverseStaticTransform,
  EuclideanCompositeTransform : EuclideanCompositeTransform
};
