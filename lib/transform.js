/**
 * Transformation objects for coordinate transformations of 3d vectors
 *
 * @module transform
 */


const { UnitQuaternion } = require('./quaternion.js');
const { Shift } = require('./shift.js');
const { Euclidean, EuclideanReverse } = require('./euclidean.js');
const { PinholeCameraPair } = require('./pinhole.js');

/**
 * Abstract base class for cooridnate transformation
 */
class Transform {
  constructor () {

    // Expose the inverse transform
    this.inv = {
      update : () => {}, // only let update get called once
      transform : this.untransform,
      transform_ip : this.untransform_ip,
      untransform : this.transform,
      untransform_ip : this.transform_ip,
      orient : this.unorient,
      orient_ip : this.unorient_ip,
      unorient : this.orient,
      unorient_ip : this.orient_ip
    };
  }

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

/** Generic Composite Tranform */
class CompositeTransform extends CompositeTransformMixin(Transform) {
  transform ( vec ) { return this.second.transform(this.first.transform( vec )); }
  untransform ( vec ) { return this.second.untransform(this.first.untransform( vec )); }
  transform_ip ( vec ) { this.first.transform_ip( vec ); this.second.transform_ip( vec ); }
  untransform_ip ( vec ) { this.first.untransform_ip( vec ); this.second.untransform_ip( vec ); } 

  orient ( quat ) { return this.second.orient(this.first.orient( quat )); }
  unorient ( quat ) { return this.second.unorient(this.first.unorient( quat )); }
  orient_ip ( quat ) { this.first.orient_ip( quat ); this.second.orient_ip( quat ); }
  unorient_ip ( quat ) { this.first.unorient_ip( quat ); this.second.unorient_ip( quat ); }
}

class PinholeCameraTransform extends Transform {
  contructor ( Q_key ) {
    this.camera = new PinholeCameraPair();
    this.Q_key = Q_key;
  }

  update ( state ) { 
    this.camera.set_Q( state[this.Q_key] );
    return this; 
  }

  transform ( vec ) { return this.camera.image( vec ); }
  transform_ip ( vec ) { this.camera.image_ip( vec ); }
  untransform ( vec ) { return this.camera.project( vec ); }
  untransform_ip ( vec ) { this.camera.project_ip( vec ); }
}


module.exports = exports = {
  Transform : Transform,
  ShiftDynamicTransform : ShiftDynamicTransform,
  ShiftStaticTransform : ShiftStaticTransform,
  RotateDynamicTransform : RotateDynamicTransform,
  RotateStaticTransform : RotateStaticTransform,
  EuclideanStaticTransform : EuclideanStaticTransform,
  EuclideanReverseStaticTransform : EuclideanReverseStaticTransform,
  EuclideanCompositeTransform : EuclideanCompositeTransform,
  CompositeTransform : CompositeTransform,
  PinholeCameraTransform : PinholeCameraTransform
};
