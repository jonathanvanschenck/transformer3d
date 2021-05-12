const assert = require('assert');

const {
  Euclidean,
  EuclideanReverse
} = require('../lib/euclidean.js');

const UQ = require('../lib/quaternion.js').UnitQuaternion;

function vec_equal(a,b,msg) {
  for (let i = 0; i < a.length; i++) 
    if (Math.abs(a[i]-b[i]) > 1e-9) assert.fail(msg ? msg : "");
}

describe("Euclidean constructor and mutation methods", () => {
  
  it("Constructor defaults to nulls", (done) => {
    let e = new Euclidean();
    vec_equal( e.quat.qvec, [1,0,0,0] , "qvec" );
    vec_equal( e.shift.vec, [0,0,0] , "shift" );
    done();
  });

  it("`set_vecs` works", (done) => {
    let e = new Euclidean();
    e.set_vecs([0,1,0,0], [2,2,2]);
    vec_equal( e.quat.qvec, [0,1,0,0] , "qvec" );
    vec_equal( e.shift.vec, [2,2,2] , "shift" );

    e.set_vecs([0,2,0,0], [2,2,2]);
    vec_equal( e.quat.qvec, [0,1,0,0] , "qvec unnormalized" );
    vec_equal( e.shift.vec, [2,2,2] , "shift" );

    assert.strict.throws( () => {
      e.set_vecs([0,0,0,0], [0,0,0])
    }, Error, "doesn't catch normalization error");

    done();
  });

  it("`set_as_composite` works", (done) => {
    let isqrt2 = 1/Math.sqrt(2);
    let a = (new Euclidean()).set_vecs([0,1,0,0], [0,0,0]);
    let b = (new Euclidean()).set_vecs([0,0,1,0], [0,0,0]);
    let e = (new Euclidean()).set_as_composite( a, b );
    vec_equal( e.quat.qvec, [0,0,0,1] , "qvec rot only" );
    vec_equal( e.shift.vec, [0,0,0] , "shift rot only" );

    a.set_vecs([1,0,0,0], [1,0,0]);
    b.set_vecs([1,0,0,0], [0,1,0]);
    e.set_as_composite( a, b );
    vec_equal( e.quat.qvec, [1,0,0,0] , "qvec trans only" );
    vec_equal( e.shift.vec, [1,1,0] , "shift trans only" );

    a.set_vecs([0,1,0,0], [1,0,0]);
    b.set_vecs([0,0,1,0], [0,1,0]);
    e.set_as_composite( a, b );
    vec_equal( e.quat.qvec, [0,0,0,1] , "qvec both" );
    vec_equal( e.shift.vec, [-1,1,0] , "shift both" );

    done();
  });
});

describe("Euclidean methods", () => {
  let suite = [
    [ [1, 0, 0], [1, 1, 0] ],
    [ [0, 1, 0], [0, 1, -1 ] ],
    [ [0, 0, 1], [0, 2, 0 ] ]
  ];

  let sqrt2 = Math.sqrt(2);
  let isqrt2 = 1/sqrt2;
  let vv;
  let e = (new Euclidean()).set_vecs([isqrt2,isqrt2,0,0], [0,1,0]);

  it("`transform` works", (done) => {
    for (let [vec, exp] of suite) {
      vv = e.transform( vec );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });

  it("`untransform` works", (done) => {
    for (let [exp, vec] of suite) {
      vv = e.untransform( vec );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });


  it("`transform_ip` works", (done) => {
    for (let [vv, exp] of suite) {
      vec = [ vv[0], vv[1], vv[2] ];
      vv = [ vec[0], vec[1], vec[2] ];
      e.transform_ip( vv );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });

  it("`untransform_ip` works", (done) => {
    for (let [exp, vv] of suite) {
      vec = [ vv[0], vv[1], vv[2] ];
      vv = [ vec[0], vec[1], vec[2] ];
      e.untransform_ip( vv );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });

  // FIXME : decide on how to handle orient, then fix me
  // let qsuite = [
  //   [ [isqrt2, isqrt2, 0, 0] , [isqrt2, isqrt2, 0, 0] ]
  // ]
  // let e2 = (new Euclidean()).set_vecs( [ isqrt2, isqrt2, 0, 0 ], [ 0, 0, 0 ] );
  // let q, q2;
  // it("`orient` works", (done) => {
  //   for ( let [ qvv, exp ] of qsuite ) {
  //     q = UQ.from_vec( qvv );
  //     q2 = e2.orient( q );
  //     vec_equal( q2.qvec, exp, `fail: t(${q.toString()}) -> ${q2.toString()}, should be ${exp}`);
  //   }
  //   done();
  // });


});

describe("Euclidean Reverse methods", () => {

  let sqrt2 = Math.sqrt(2);
  let isqrt2 = 1/sqrt2;

  it("getting translation works", (done) => {
    let e = (new EuclideanReverse()).set_vecs([isqrt2,isqrt2,0,0],[0,1,0])
    vec_equal( e.translation, [0, 0, -1] );
    done();
  });
  
  let suite = [
    [ [1, 0, 0], [1, 0, -1] ],
    [ [0, 1, 0], [0, 0, -2 ] ],
    [ [0, 0, 1], [0, 1, -1 ] ]
  ];

  let vv;
  let e = (new EuclideanReverse()).set_vecs([isqrt2,isqrt2,0,0], [0,1,0]);

  it("`transform` works", (done) => {
    for (let [vec, exp] of suite) {
      vv = e.transform( vec );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });

  it("`untransform` works", (done) => {
    for (let [exp, vec] of suite) {
      vv = e.untransform( vec );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });


  it("`transform_ip` works", (done) => {
    for (let [vv, exp] of suite) {
      vec = [ vv[0], vv[1], vv[2] ];
      vv = [ vec[0], vec[1], vec[2] ];
      e.transform_ip( vv );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });

  it("`untransform_ip` works", (done) => {
    for (let [exp, vv] of suite) {
      vec = [ vv[0], vv[1], vv[2] ];
      vv = [ vec[0], vec[1], vec[2] ];
      e.untransform_ip( vv );
      vec_equal( vv, exp, `fail: t(${vec}) -> ${vv}, should be ${exp}` );
    }
    done();
  });
});


describe("Compositing transforms correctly", () => {
  
  let isqrt2 = 1/Math.sqrt(2);

  it("E then ER", (done) => {
    let a = (new Euclidean()).set_vecs([isqrt2, isqrt2, 0, 0], [0, 1, 0])
    let b = (new EuclideanReverse()).set_vecs([isqrt2, 0, isqrt2, 0], [1, 0, 0])
    let e = (new EuclideanReverse()).set_as_composite( a, b );
    let vec = [ 0, 1, 0];
    let vv = e.transform( vec );
    vec_equal( vv, [ 1, 1, 1 ]);
    done();
  });

  it("ER then E", (done) => {
    let b = (new Euclidean()).set_vecs([isqrt2, isqrt2, 0, 0], [0, 1, 0])
    let a = (new EuclideanReverse()).set_vecs([isqrt2, 0, isqrt2, 0], [1, 0, 0])
    let e = (new EuclideanReverse()).set_as_composite( a, b );
    let vec = [ 1, 0, 0];
    let vv = e.transform( vec );
    vec_equal( vv, [ 0, 3, 0 ]);
    done();
  });

});

describe("Euclidean Tranformations Rotate Coordinate Systems", () => {
  
  let isqrt2 = 1/Math.sqrt(2);

  it("Transforming vectors rotates coordinates", (done) => {
    let cos = Math.cos(0.1/2.0);
    let sin = Math.sin(0.1/2.0);
    let e = (new Euclidean()).set_vecs([cos, sin, 0, 0 ], [0, 0, 0]);
    let vv = e.transform( [ 0, 0, 1] );
    vec_equal( vv, [ 0, Math.sin(0.1), Math.cos(0.1) ], "fail vector");

    let q = UQ.from_axis(0.1, [1,0,0]);
    let q2 = e.orient(q);
    vec_equal(q2.qvec, [ Math.cos(0.2/2), Math.sin(0.2/2), 0, 0 ]);
    done();
  });
});
