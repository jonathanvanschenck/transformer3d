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
 * Abstract base class for cooridnate transformations
 *
 * This is the class which can be inhereted from the generate
 * transformations used by `CoordinteNetwork`s to transform
 * between coordinate systems
 *
 * An instance of this class represents the identity tranformation,
 * in that it will always return the same vec/quaternion, regardless
 * of any other method calls
 */
class Transform {
  constructor () {
  
    let self = this;

    // Expose the inverse transform_vec
    //  .bind(self) is necessary to access the full
    //  Transform object via `this.` inside the methods
    //  Not totally sure why that doesn't get happen for
    //  free...
    this.inv = {
      update : () => {}, // only let update get called once
      transform_quat : self.untransform_quat.bind(self),
      transform_quat_ip : self.untransform_quat_ip.bind(self),
      untransform_quat : self.transform_quat.bind(self),
      untransform_quat_ip : self.transform_quat_ip.bind(self),
      transform_vec : self.untransform_vec.bind(self),
      transform_vec_ip : self.untransform_vec_ip.bind(self),
      untransform_vec : self.transform_vec.bind(self),
      untransform_vec_ip : self.transform_vec_ip.bind(self),
      orient : self.unorient.bind(self),
      orient_ip : self.unorient_ip.bind(self),
      unorient : self.orient.bind(self),
      unorient_ip : self.orient_ip.bind(self)
    };
  }

  /**
   * Update any dynamic data
   *
   * Some transformations are 'dynamic' meaning that
   * their actual tranformation is contingent upon
   * data not provided at instantiation time. This
   * is the method to be able to provide that data
   * later on. The common convention is for dynamic
   * transformations to be instantiated with a 'key'
   * string, for which `state[key]` will yeild the
   * correct data for updating. Note that this method
   * is also responsible for handling the case when
   * a state is passed which does not contain the
   * 'key' this class is expecting. The advised method
   * is to put a gaurd statement at the top of the method
   * like
   * ```javascript
   * if (state[key] is undefined) return this;
   * ```
   * See `ShiftDynamicTransform` for an example.
   *
   * For non-dynamic transformation, this method is a
   * noop.
   *
   * @param {Object} state - a data state, containing dynamic data
   * @return {this}
   */
  update ( state ) { return this; }

  /**
   * Transform a vector
   *
   * @param {number[]} vec - a 3d vector to transform
   * @return {number[]} the transformed vector
   */
  transform_vec ( vec ) { return vec; }

  /**
   * Undo a vector transform
   *
   * @param {number[]} vec - a 3d vector to untransform
   * @return {number[]} the untransformed vector
   */
  untransform_vec ( vec ) { return vec; }

  /**
   * Transform a vector in place
   *
   * Note, the provided vector is mutated by this method.
   *
   * @param {number[]} vec - a 3d vector to transform in place
   * @return {undefined}
   */
  transform_vec_ip ( vec ) {}

  /**
   * Undo a vector transform in place
   *
   * Note, the provided vector is mutated by this method.
   *
   * @param {number[]} vec - a 3d vector to untransform in place
   * @return {undefined}
   */
  untransform_vec_ip ( vec ) {}

  /**
   * Transform an orientation quaternion
   *
   * @param {UnitQuaternion} quat - an orientation quaternion to transform
   * @return {UnitQuaternion} the transformed orientation quaternion
   */
  transform_quat ( quat ) { return quat; }

  /**
   * Undo a transform of an orientation quaternion
   *
   * @param {UnitQuaternion} quat - an orientation quaternion to untransform
   * @return {UnitQuaternion} the untransformed orientation quaternion
   */
  untransform_quat ( quat ) { return quat; }

  /**
   * Transform an orientation quaternion in place
   *
   * Note, the provided quaternion is mutated by this method.
   *
   * @param {UnitQuaternion} quat - an orientation quaternion to transform
   * @return {undefined}
   */
  transform_quat_ip ( quat ) {}

  /**
   * Undo a transform of an orientation quaternion in place
   *
   * Note, the provided quaternion is mutated by this method.
   *
   * @param {UnitQuaternion} quat - an orientation quaternion to untransform in place
   * @return {undefined}
   */
  untransform_quat_ip ( quat ) {}

  orient ( quat ) { return quat; }
  unorient ( quat ) { return quat; }
  orient_ip ( quat ) {}
  unorient_ip ( quat ) {}
}

/**
 * A class mixin for Reverse Euclidean-type transformations
 *
 * This mixin does several things to the base classes it acts on:
 *    1) It creates an instance of `EuclideanReverse` attached to this class
 *    instance as `this.euclidean`
 *    2) It updates all the `this.transform...` methods to reference the 
 *    internal Euclidean vector and quaternion operations.
 *    3) Add a flag `this.is_euclidean` for checking
 *
 * This intent is for subclasses that inherit from this to override either the
 * constructor and modify `this.euclidean` at instantiation (e.g. `EuclideanReverseStaticTransform`)
 * or to override the `this.update` method to modify `this.euclidean` with some
 * dynamic data (e.g. `ShiftDynamicTransform`).
 *
 * Use like: `class NewTranform extends EuclideanReverseTransformMixin(Base) {}`
 */
const EuclideanReverseTransformMixin = (Sub) => class extends Sub {
  constructor () {
    super();
    this.is_euclidean = true;
    this.euclidean = new EuclideanReverse();
  }

  transform_vec ( vec ) { return this.euclidean.transform_vec( vec ); }
  untransform_vec ( vec ) { return this.euclidean.untransform_vec( vec ); }
  transform_vec_ip ( vec ) { this.euclidean.transform_vec_ip( vec ); }
  untransform_vec_ip ( vec ) { this.euclidean.untransform_vec_ip( vec ); }

  transform_quat ( quat ) { return this.euclidean.transform_quat( quat ); }
  untransform_quat ( quat ) { return this.euclidean.untransform_quat( quat ); }
  transform_quat_ip ( quat ) { this.euclidean.transform_quat_ip( quat ); }
  untransform_quat_ip ( quat ) { this.euclidean.untransform_quat_ip( quat ); }

  orient ( quat ) { return this.euclidean.orient( quat ); }
  unorient ( quat ) { return this.euclidean.unorient( quat ); }
  orient_ip ( quat ) { this.euclidean.orient_ip( quat ); }
  unorient_ip ( quat ) { this.euclidean.unorient_ip( quat ); }
}

/**
 * A class mixin for Euclidean-type transformations
 *
 * This mixin does several things to the base classes it acts on:
 *    1) It creates an instance of `Euclidean` attached to this class
 *    instance as `this.euclidean`
 *    2) It updates all the `this.transform...` methods to reference the 
 *    internal Euclidean vector and quaternion operations.
 *    3) Add a flag `this.is_euclidean` for checking
 *
 * This intent is for subclasses that inherit from this to override either the
 * constructor and modify `this.euclidean` at instantiation (e.g. `EuclideanStaticTransform`)
 * or to override the `this.update` method to modify `this.euclidean` with some
 * dynamic data (e.g. `ShiftDynamicTransform`).
 *
 * Use like: `class NewTranform extends EuclideanTransformMixin(Base) {}`
 */
const EuclideanTransformMixin = (Sub) => class extends Sub {
  constructor () {
    super();
    this.is_euclidean = true;
    this.euclidean = new Euclidean();
  }

  transform_vec ( vec ) { return this.euclidean.transform_vec( vec ); }
  untransform_vec ( vec ) { return this.euclidean.untransform_vec( vec ); }
  transform_vec_ip ( vec ) { this.euclidean.transform_vec_ip( vec ); }
  untransform_vec_ip ( vec ) { this.euclidean.untransform_vec_ip( vec ); }

  transform_quat ( quat ) { return this.euclidean.transform_quat( quat ); }
  untransform_quat ( quat ) { return this.euclidean.untransform_quat( quat ); }
  transform_quat_ip ( quat ) { this.euclidean.transform_quat_ip( quat ); }
  untransform_quat_ip ( quat ) { this.euclidean.untransform_quat_ip( quat ); }

  orient ( quat ) { return this.euclidean.orient( quat ); }
  unorient ( quat ) { return this.euclidean.unorient( quat ); }
  orient_ip ( quat ) { this.euclidean.orient_ip( quat ); }
  unorient_ip ( quat ) { this.euclidean.unorient_ip( quat ); }
}

/**
 * A static Reverse Euclidean Transform class
 *
 * This class allows for a reverse euclidean transformation of coordinate
 * systems, which the rotation and shift known at the time of instantiation.
 *
 * See `euclidean.EuclideanReverse` for more details
 */
class EuclideanReverseStaticTransform extends EuclideanReverseTransformMixin(Transform) {
  /**
   * Constructor
   *
   * @param {number[]} qvec - the quaternion vector for rotation `[re, i, j, k]`
   * @param {number[]} vec - the shift vector `[ x, y, z ]`
   * @return {EuclideanReverseStaticTransform}
   */
  constructor ( qvec, vec ) {
    super();
    this.euclidean.set_vecs( qvec, vec );
  }
}

/**
 * A static Euclidean Transform class
 *
 * This class allows for a euclidean transformation of coordinate
 * systems, which the rotation and shift known at the time of instantiation.
 *
 * See `euclidean.Euclidean` for more details
 */
class EuclideanStaticTransform extends EuclideanTransformMixin(Transform) {
  /**
   * Constructor
   *
   * @param {number[]} qvec - the quaternion vector for rotation `[re, i, j, k]`
   * @param {number[]} vec - the shift vector `[ x, y, z ]`
   * @return {EuclideanStaticTransform}
   */
  constructor ( qvec, vec ) {
    super();
    this.euclidean.set_vecs( qvec, vec );
  }
}

/**
 * A dynamic shift (translation) transformation class
 *
 * These classes form a single cover of T(3), and are dynamic in the sense
 * that the actual shift which is applied is not provided at the time of
 * instantiation, but rather provided with the method `this.update`.
 */
class ShiftDynamicTransform extends EuclideanTransformMixin(Transform) {
  /**
   * Constructor
   *
   * @param {string} data_key - the key for which `state[key]` gives the shift, where `state` is provided later to `this.update(state)`
   */
  constructor ( data_key ) {
    super();
    this.data_key = data_key;
    this.setter_name = "set_vec";
  }

  update ( state ) {
    let vec = state[this.data_key];
    if (vec === undefined) { return this; }
    this.euclidean.shift[this.setter_name]( vec );
    
    return this;
  }
  
  transform_vec ( vec ) { return this.euclidean.shift.shift( vec ); }
  untransform_vec ( vec ) { return this.euclidean.shift.unshift( vec ); }
  transform_vec_ip ( vec ) { this.euclidean.shift.shift_ip( vec ); }
  untransform_vec_ip ( vec ) { this.euclidean.shift.unshift_ip( vec ); }
  
  // Set these methods to identity, since the rotation is zero
  transform_quat ( quat ) { return quat; }
  untransform_quat ( quat ) { return quat; }
  transform_quat_ip ( quat ) {  }
  untransform_quat_ip ( quat ) {  }

  orient ( quat ) { return quat; }
  unorient ( quat ) { return quat; }
  orient_ip ( quat ) {}
  unorient_ip ( quat ) {}
}

/**
 * A shift (translation) transformation class
 *
 * These classes form a single cover of T(3).
 */
class ShiftStaticTransform extends ShiftDynamicTransform {
  /**
   * Constructor
   *
   * @param {number[]} vec - the 3d vector shift of this transformation
   */
  constructor ( vec ) {
    super();
    this.euclidean.shift.set_vec( vec );
  }
  update ( state ) { return this; }
}


// FIXME : check for data keys in state
ROTATION_DATA_EXTRACTOR = {
  undefined : function (state) { return this; },
  "set_axis" : function ( state ) {
    let angle = state[this.data_key[0]];
    let axis = state[this.data_key[1]];
    angle = angle === undefined ? this.euclidean.quat.angle : angle;
    axis = axis === undefined ? this.euclidean.quat.axis : axis;
    this.euclidean.quat.set_axis( angle, axis );
    return this;
  },
  "set_vec" : function (state) {
    let qvec = state[this.data_key];
    if (qvec === undefined) return this;
    this.euclidean.quat.set_vec( qvec );
    return this;
  },
  "set_euler" : function (state) {

    let yaw_key = this.data_key["yaw"];
    let yaw;
    if (yaw_key === undefined) {
      yaw = state[yaw_key] === undefined ? this.euclidean.quat.yaw : state[yaw_key];
    } else {
      yaw = this.euclidean.quat.yaw;
    }

    let pitch_key = this.data_key["pitch"];
    let pitch;
    if (pitch_key === undefined) {
      pitch = state[pitch_key] === undefined ? this.euclidean.quat.pitch : state[pitch_key];
    } else {
      pitch = this.euclidean.quat.pitch;
    }

    let roll_key = this.data_key["roll"];
    let roll;
    if (roll_key === undefined) {
      roll = state[roll_key] === undefined ? this.euclidean.quat.roll : state[roll_key];
    } else {
      roll = this.euclidean.quat.roll;
    }

    this.euclidean.quat.set_euler(yaw, pitch, roll);
    return this;
  }
};


/**
 * A dynamic rotation transformation class
 *
 * These classes form a double cover of SO(3), and are dynamic in the sense
 * that the actual rotation which is applied is not provided at the time of
 * instantiation, but rather provided with the method `this.update`.
 */
class RotateDynamicTransform extends EuclideanTransformMixin(Transform) {
  /**
   * Constructor
   *
   * There are several methods of providing the rotation, specified by `setter_name`:
   *  1) "set_axis" where an angle and rotational axis are provided. In this case,
   *  the `data_key` should be a list: `["key_for_angle", "key_for_rotation_axis"]`
   *  2) "set_vec" where a quaterion qvec `[re, i, j, k]` are provided. In this case,
   *  the `data_key` should be a string `"key_for_qvec"`.
   *  3) "set_euler" where a yaw, pitch and roll are provided. In this case, the 
   *  `data_key` should be an object: `{ yaw: "key_for_yaw", pitch: "key_for_pitch",
   *  roll: "key_for_roll" }`. Note any of the keys can be `undefined`
   *
   * @param {string|list|Object} data_key - keys for dynamic data given to `this.update(state)`
   * @param {string} setter_name - type of setting method, should be "set_axis", "set_vec" or
   * "set_euler"
   */
  constructor ( data_key, setter_name ) {
    super();
    this.data_key = data_key;
    this.setter_name = setter_name;
    
    // overwrite update method with arrow function
    this.update = (ROTATION_DATA_EXTRACTOR[setter_name]).bind(this);
  }

  // Set these methods to ignore the shift, since it is zero
  transform_vec ( vec ) { return this.euclidean.quat.rotate( vec ); }
  untransform_vec ( vec ) { return this.euclidean.quat.unrotate( vec ); }
  transform_vec_ip ( vec ) { this.euclidean.quat.rotate_ip( vec ); }
  untransform_vec_ip ( vec ) { this.euclidean.quat.unrotate_ip( vec ); }

}

/**
 * A rotation transformation class
 *
 * These classes form a double cover of SO(3).
 */
class RotateStaticTransform extends RotateDynamicTransform {
  /**
   * Constructor
   *
   * There are several ways to instantiate this class
   *  1) Setting an angle and axis of the rotation. In this case, `vec_or_obj_or_angle`
   *  be the angle of the rotation (in rad), and `axis_or_null` should be the rotational axis.
   *  2) Setting a quaternion qvec. In this case, `vec_or_obj_or_angle`
   *  be the quaternion vector `[re, i, j, k]`, and `axis_or_null` should be `undefined`.
   *  3) Setting the euler angles. In this case, `vec_or_obj_or_angle`
   *  be an object: `{ yaw, pitch, roll }`, and `axis_or_null` should be `undefined`.
   *
   * @param {number[]|Object|number} vec_or_obj_or_angle
   * @param {number[]|undefined} axis_or_null
   */
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

/**
 * A class mixin for composite transformations
 *
 * This mixin is intended to help define transformations which are the composite of two
 * other transformations `first` and `second`.
 *
 * This mixin does several things to the base classes it acts on:
 *    1) It modifies the constructor to expect two positional arguments: `first` and 
 *    `second`, the two transformations which this is the composite of.
 *    2) It modifies the `this.update` method to call update on `first` and `second`.
 *
 * This intent is for subclasses that inherit from this to override all the `this.transform...`
 * methods to define how `first` and `second` interact with the vec/quaternions to produce
 * the total transformation. See `CompositeTransform` for a simple example. Note that this
 * mixin does NOT change any of these methods by default, since it could be mixed in with
 * other base classes which might already have those methods defined in special ways. See
 * `EuclideanCompositeTransform` as an example, since it also inherits from other classes.
 *
 * Use like: `class NewTranform extends CompositeTransformMixin(Base) {}`
 */
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

/** 
 * A composite transformation class for Euclidean-type transformations
 *
 * This class is the composite of two other Euclidean-type transformations 
 * given to the constructor as `first` and `second`
 */
class EuclideanCompositeTransform extends CompositeTransformMixin(EuclideanTransformMixin(Transform)) {
  /**
   * Constructor
   *
   * @param {EuclideanTransform} first - the first transformation to be applied in the composite
   * @param {EuclideanTransform} second - the second transformation to be applied in the composite
   */
  constructor ( first, second ) { super( first, second ); }

  update ( state ) {
    super.update( state );
    this.euclidean.set_as_composite( this.first.euclidean, this.second.euclidean );
    return this;
  }
}

/** 
 * A composite transformation class
 *
 * This class is the composite of two other transformations given to the constructor as `first` and `second`
 */
class CompositeTransform extends CompositeTransformMixin(Transform) {
  /**
   * Constructor
   *
   * @param {Transform} first - the first transformation to be applied in the composite
   * @param {Transform} second - the second transformation to be applied in the composite
   */
  constructor ( first, second ) { super( first, second ); }

  transform_vec ( vec ) { return this.second.transform_vec(this.first.transform_vec( vec )); }
  untransform_vec ( vec ) { return this.second.untransform_vec(this.first.untransform_vec( vec )); }
  transform_vec_ip ( vec ) { this.first.transform_vec_ip( vec ); this.second.transform_vec_ip( vec ); }
  untransform_vec_ip ( vec ) { this.first.untransform_vec_ip( vec ); this.second.untransform_vec_ip( vec ); } 

  transform_quat ( vec ) { return this.second.transform_quat(this.first.transform_quat( vec )); }
  untransform_quat ( vec ) { return this.second.untransform_quat(this.first.untransform_quat( vec )); }
  transform_quat_ip ( vec ) { this.first.transform_quat_ip( vec ); this.second.transform_quat_ip( vec ); }
  untransform_quat_ip ( vec ) { this.first.untransform_quat_ip( vec ); this.second.untransform_quat_ip( vec ); } 

  orient ( quat ) { return this.second.orient(this.first.orient( quat )); }
  unorient ( quat ) { return this.second.unorient(this.first.unorient( quat )); }
  orient_ip ( quat ) { this.first.orient_ip( quat ); this.second.orient_ip( quat ); }
  unorient_ip ( quat ) { this.first.unorient_ip( quat ); this.second.unorient_ip( quat ); }
}

/**
 * A pinhole camera transformation calss
 *
 * This class handles imaging vectors using a pinhole
 * model for a pair of stereorectified cameras. This class
 * follows the conventions of [OpenCV](https://docs.opencv.org/) and users are refered
 * there for details.
 *
 * This class is also 'dynamic' in the sense that the Q-matrix of the transformation
 * is not provided at instatiation, but later via `this.update(state)`.
 */
class PinholeCameraTransform extends Transform {
  /**
   * Constructor
   *
   * @param {string} Q_key - the key of the Q matrix, accessed as `state[Q_key]` in `this.update(state)`
   */
  constructor ( Q_key ) {
    super();
    this.camera = new PinholeCameraPair();
    this.Q_key = Q_key;
  }

  update ( state ) { 
    let Q = state[this.Q_key];
    if (Q === undefined) return this;

    this.camera.set_Q( state[this.Q_key] );
    return this; 
  }

  transform_vec ( vec ) { return this.camera.image( vec ); }
  transform_vec_ip ( vec ) { this.camera.image_ip( vec ); }
  untransform_vec ( vec ) { return this.camera.project( vec ); }
  untransform_vec_ip ( vec ) { this.camera.project_ip( vec ); }
}


module.exports = exports = {
  Transform : Transform,
  EuclideanTransformMixin : EuclideanTransformMixin,
  EuclideanReverseTransformMixin : EuclideanReverseTransformMixin,
  ShiftDynamicTransform : ShiftDynamicTransform,
  ShiftStaticTransform : ShiftStaticTransform,
  RotateDynamicTransform : RotateDynamicTransform,
  RotateStaticTransform : RotateStaticTransform,
  EuclideanStaticTransform : EuclideanStaticTransform,
  EuclideanReverseStaticTransform : EuclideanReverseStaticTransform,
  EuclideanCompositeTransform : EuclideanCompositeTransform,
  CompositeTransformMixin : CompositeTransformMixin,
  CompositeTransform : CompositeTransform,
  PinholeCameraTransform : PinholeCameraTransform
};
