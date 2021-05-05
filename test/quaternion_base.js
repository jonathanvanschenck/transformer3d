const assert = require('assert');

const { quat_mult, quat_wrap_ip, quat_wrap, UnitQuaternion } = require('../lib/quaternion.js');

function vec_equal(a,b) {
  for (let i = 0; i < a.length; i++) 
    if (Math.abs(a[i]-b[i]) > 1e-9) assert.fail();
}


describe('Quaternion Multiplication', function () {
  let c = [0,0,0,0];

  it("0*1 = 0", (done) => {
    quat_mult([0,0,0,0],[1,0,0,0],c);
    vec_equal(c,[0,0,0,0]);
    done();
  });

  it("1*1 = 1", (done) => {
    quat_mult([1,0,0,0],[1,0,0,0],c);
    vec_equal(c,[1,0,0,0]);
    done();
  });

  it("1*i = i", (done) => {
    quat_mult([1,0,0,0],[0,1,0,0],c);
    vec_equal(c,[0,1,0,0]);
    done();
  });

  it("i*i = -1", (done) => {
    quat_mult([0,1,0,0],[0,1,0,0],c);
    vec_equal(c,[-1,0,0,0]);
    done();
  });

  it("i*j = k", (done) => {
    quat_mult([0,1,0,0],[0,0,1,0],c);
    vec_equal(c,[0,0,0,1]);
    done();
  });
});


describe('Quaternion Wrapping In Place', function () {
  let isqrt2 = 1/Math.sqrt(2);
  let q = [0,0,0,0];
  let v = [0,0,0];
  let c = [0,0,0,0];


  it("Wraping identity makes no change", (done) => {

    q = [1,0,0,0];
    v = [1,1,1];
    quat_wrap_ip(q,v,c);
    vec_equal(v,[1,1,1]);

    done();
  });

  it("Rotations around a vec's axis make no change", (done) => {

    q = [isqrt2,0,isqrt2,0];
    v = [0,1,0];
    quat_wrap_ip(q,v,c);
    vec_equal(v,[0,1,0]);

    done();
  });

  it("Rotating x into y", (done) => {

    q = [isqrt2,0,0,-isqrt2];
    v = [1,0,0];
    quat_wrap_ip(q,v,c);
    vec_equal(v,[0,1,0]);

    done();
  });

  it("Rotating x into -x", (done) => {

    q = [0,0,0,-1];
    v = [1,0,0];
    quat_wrap_ip(q,v,c);
    vec_equal(v,[-1,0,0]);

    done();
  });
});

describe('Quaternion Wrapping', function () {
  let isqrt2 = 1/Math.sqrt(2);
  let q = [0,0,0,0];
  let v = [0,0,0];
  let v2 = [0,0,0];
  let c = [0,0,0,0];


  it("Wraping identity makes no change", (done) => {

    q = [1,0,0,0];
    v = [1,1,1];
    quat_wrap(q,v,v2,c);
    vec_equal(v2,[1,1,1]);

    done();
  });

  it("Rotations around a vec's axis make no change", (done) => {

    q = [isqrt2,0,isqrt2,0];
    v = [0,1,0];
    quat_wrap(q,v,v2,c);
    vec_equal(v2,[0,1,0]);

    done();
  });

  it("Rotating x into y", (done) => {

    q = [isqrt2,0,0,-isqrt2];
    v = [1,0,0];
    quat_wrap(q,v,v2,c);
    vec_equal(v2,[0,1,0]);

    done();
  });

  it("Rotating x into -x", (done) => {

    q = [0,0,0,-1];
    v = [1,0,0];
    quat_wrap(q,v,v2,c);
    vec_equal(v2,[-1,0,0]);

    done();
  });
});


describe("Unit Quaternion construction", () => {
  let isqrt2 = 1/Math.sqrt(2);

  it("Construct identity UnitQuaternion", (done) => {
    let q = new UnitQuaternion();
    vec_equal(q.qvec, [1,0,0,0]);
    done();
  });

  it("Construct UnitQuaternion about x", (done) => {
    let q = UnitQuaternion.from_axis(Math.PI/2, [1,0,0]);
    vec_equal(q.qvec, [isqrt2,isqrt2,0,0]);
    done();
  });

  it("Construct UnitQuaternion about y", (done) => {
    let q = UnitQuaternion.from_axis(Math.PI/2, [0,1,0]);
    vec_equal(q.qvec, [isqrt2,0,isqrt2,0]);
    done();
  });

  it("Construct UnitQuaternion from vector", (done) => {
    let q = UnitQuaternion.from_vec([0.5,0.5,0.5,0.5]);
    vec_equal(q.qvec, [0.5,0.5,0.5,0.5]);
    done();
  });

  it("Construct UnitQuaternion from (unnormalized) vector", (done) => {
    let q = UnitQuaternion.from_vec([1,1,1,1]);
    vec_equal(q.qvec, [0.5,0.5,0.5,0.5]);
    done();
  });

  it("Construct UnitQuaternion from euler yaw", (done) => {
    let q = UnitQuaternion.from_euler({ yaw : Math.PI / 2.0 });
    vec_equal( q.qvec, [isqrt2, 0, 0, -isqrt2] );
    done();
  });

  it("Constructor error checking works", (done) => {
    assert.strict.throws( () => { UnitQuaternion.from_axis( undefined, [0,0,1] ) }, Error, "axis angle is undefined");
    assert.strict.throws( () => { UnitQuaternion.from_axis( 0.0, [0,1] ) }, Error, "axis vector doesn't have dimension 3");
    assert.strict.throws( () => { UnitQuaternion.from_axis( 0.0, 0.0 ) }, Error, "axis vector is a number");
    assert.strict.throws( () => { UnitQuaternion.from_euler({ yaw : NaN }) }, Error, "yaw angle is NaN");
    assert.strict.throws( () => { UnitQuaternion.from_euler({ yaw : [] }) }, Error, "yaw angle is an object");

    done();
  });

});


describe("UnitQuaternion Operations", () => {
  let isqrt2 = 1/Math.sqrt(2);

  it("1*1 = 1", (done) => {
    let q1 = new UnitQuaternion();
    let q2 = new UnitQuaternion();
    let q3 = q1.mult(q2);
    vec_equal(q3.qvec, [1,0,0,0]);
    done();
  });

  it("i*j = k", (done) => {
    let q1 = UnitQuaternion.from_vec([0,1,0,0]);
    let q2 = UnitQuaternion.from_vec([0,0,1,0]);
    let q3 = q1.mult(q2);
    vec_equal(q3.qvec, [0,0,0,1]);
    done();
  });

  it("rotate vector via identity makes no change", (done) => {
    let q1 = new UnitQuaternion();
    let v = q1.rotate([1,0,0]);
    vec_equal(v,[1,0,0]);
    done();
  });

  it("rotate vector around common axis makes no change", (done) => {
    let q1 = UnitQuaternion.from_axis(Math.PI/2, [1,0,0]);
    let v = q1.rotate([1,0,0]);
    vec_equal(v,[1,0,0]);
    done();
  });

  it("Can rotate x to y", (done) => {
    let q1 = UnitQuaternion.from_axis(-Math.PI/2, [0,0,1]);
    let v = q1.rotate([1,0,0]);
    vec_equal(v,[0,1,0]);
    done();
  });

  it("Can rotate in place", (done) => {
    let q1 = UnitQuaternion.from_axis(-Math.PI/2, [0,0,1]);
    let v = [1,0,0];
    q1.rotate_ip(v);
    vec_equal(v,[0,1,0]);
    done();
  });

});

describe("UnitQuaternion Mutations", () => {

  it("Can compose rotations", (done) => {
    let q1 = UnitQuaternion.from_axis(Math.PI/2, [1,0,0]);
    let q2 = UnitQuaternion.from_axis(Math.PI/2, [0,1,0]);
    let q3 = new UnitQuaternion();
    q3.set_as_composite( q1, q2 );
    vec_equal( q3.qvec, [0.5,0.5,0.5,0.5] );
    done();
  });

});