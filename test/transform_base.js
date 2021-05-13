const assert = require('assert');

const {
  Transform,
  ShiftDynamicTransform,
  ShiftStaticTransform,
  RotateDynamicTransform,
  RotateStaticTransform,
  EuclideanStaticTransform,
  EuclideanReverseStaticTransform,
  EuclideanCompositeTransform,
  PinholeCameraTransform
} = require('../lib/transform.js');

// const UQ = require('../lib/quaternion.js').UnitQuaternion;

function vec_equal(a,b,msg) {
  for (let i = 0; i < a.length; i++) 
    if (Math.abs(a[i]-b[i]) > 1e-9) assert.fail(msg ? msg : "");
}

describe("Static Euclidean Transforms", () => {
  
  let isqrt2 = 1/Math.sqrt(2);

  it("Static Euclidean Constructions work", (done) => {
    let s = new EuclideanStaticTransform( [0, 1, 0, 0], [ 1, 0, 1] );
    vec_equal( s.euclidean.quat.qvec, [0, 1, 0, 0], "qvec");
    vec_equal( s.euclidean.shift.vec, [1, 0, 1] , "vec");
    vec_equal( s.euclidean.translation, [1, 0, 1], "translation" );
    done();
  });

  it("Static Reverse Euclidean Constructions work", (done) => {
    let s = new EuclideanReverseStaticTransform( [0, 1, 0, 0], [ 1, 0, 1] );
    vec_equal( s.euclidean.quat.qvec, [0, 1, 0, 0], "qvec");
    vec_equal( s.euclidean.shift.vec, [1, 0, 1] , "vec");
    vec_equal( s.euclidean.translation, [1, 0, -1], "translation" );
    done();
  });

  it("Static Shift Constructions work", (done) => {
    let s = new ShiftStaticTransform( [ 1, 1, 1] );
    vec_equal( s.euclidean.shift.vec, [1, 1, 1] );
    done();
  });

  it("Static Rotation Constructions work", (done) => {
    
    let s;

    // qvec construction
    s = new RotateStaticTransform( [ 0, 1, 0, 0] );
    vec_equal( s.euclidean.quat.qvec, [0, 1, 0, 0], "qvec construction failed" );

    // axis construction
    s = new RotateStaticTransform( Math.PI, [ 1, 0, 0] );
    vec_equal( s.euclidean.quat.qvec, [0, 1, 0, 0], "qvec construction failed" );

    // euler construction
    s = new RotateStaticTransform({ pitch : Math.PI });
    vec_equal( s.euclidean.quat.qvec, [0, 1, 0, 0], "qvec construction failed" );

    done();
  });


  it("Static Euclideans transform properly", (done) => {
    let vec = [ 0, 1, 0];

    let s = new ShiftStaticTransform( [ 1, 0, 1] );
    vec_equal( s.transform_vec(vec), [1, 1, 1], "shift");

    let r = new RotateStaticTransform( [ 0, 1, 0, 0 ] );
    vec_equal( r.transform_vec(vec), [ 0, -1, 0 ], "rotate" );

    let e = new EuclideanStaticTransform( [0, 1, 0 , 0], [1, 1, 1]);
    vec_equal( e.transform_vec(vec), [ 1, 0, 1 ], "euclidean" );

    done();
  });

});


describe("Euclidean Composition", () => {
  
  it("Composition construction from EucStatic + EucStatic works", (done) => {
    
    //     FIXME : implement
//     let c = new EuclideanCompositeTransform(
//       new RotateStaticTransform( [ 0, 1, 0, 0] ),
//       new ShiftStaticTransform( [1, 1, 1] )
//     ).update({});
// 
//     vec_equal( c.euclidean.quat.qvec,  [ 0, 1, 0, 0 ], "qvec");
//     vec_equal( c.euclidean.shift.vec,  [ 1, 1, 1 ], "vec");

    done();
  });
  it("Composition construction from RotStatic + ShiftStatic works", (done) => {
    
    let c = new EuclideanCompositeTransform(
      new RotateStaticTransform( [ 0, 1, 0, 0] ),
      new ShiftStaticTransform( [1, 1, 1] )
    ).update({});

    vec_equal( c.euclidean.quat.qvec,  [ 0, 1, 0, 0 ], "qvec");
    vec_equal( c.euclidean.shift.vec,  [ 1, 1, 1 ], "vec");

    done();
  });
});


describe("Updating dynamic data in Transforms",() => { 

  it("Updating with empty state is no op", (done) => {
    let t = new Transform();
    t.update({}); // shouldn't throw an error

    t = new PinholeCameraTransform("Q");
    t.update({}); // shouldn't thrown an error

    t = new ShiftDynamicTransform("shift");
    t.update({}); // shouldn't throw an error
  
    for ( let [dk, sn] of [
      [["angle_key", "axis_key"], "set_axis"],
      ["qvec_key", "set_vec"],
      [{yaw:"yaw_key", pitch:"pitch_key", roll:"roll_key"}, "set_euler"]
    ]) {
      t = new RotateDynamicTransform(dk, sn);
      t.update({}); // shouldn't throw an error
    }

    done();
  });

  it("Updating with bad state is no op", (done) => {
    let t = new Transform();
    t.update({bad:1}); // shouldn't throw an error

    t = new PinholeCameraTransform("Q");
    t.update({bad:1}); // shouldn't thrown an error

    t = new ShiftDynamicTransform("shift");
    t.update({bad:1}); // shouldn't throw an error
  
    for ( let [dk, sn] of [
      [["angle_key", "axis_key"], "set_axis"],
      ["qvec_key", "set_vec"],
      [{yaw:"yaw_key", pitch:"pitch_key", roll:"roll_key"}, "set_euler"]
    ]) {
      t = new RotateDynamicTransform(dk, sn);
      t.update({bad:1}); // shouldn't throw an error
    }

    done();
  });
}); 
