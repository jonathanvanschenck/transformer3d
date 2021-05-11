const assert = require('assert');

const {
  PinholeCameraPair,
  image,
  image_ip,
  project,
  project_ip
} = require('../lib/pinhole.js');

function vec_equal(a,b,msg) {
  for (let i = 0; i < a.length; i++) 
    if (Math.abs(a[i]-b[i]) > 1e-9) assert.fail(msg ? msg : "");
}

describe("Base functions", () => {
  let Q = [
    [ 0, 0, 0,  -1],
    [ 0, 0, 0,  -1],
    [ 0, 0, 0,   3],
    [ 0, 0, 0.5, 0]
  ];

  it("image works", (done) => {
    let ivec = [ 0, 0, 0 ];
    for ( let [wvec, exp] of [
      [ [0, 0, 0] , [1, 1, Infinity] ],
      [ [0, 0, 1] , [1, 1, 6] ],
      [ [0, 0, -1] , [1, 1, -6] ],
      [ [1, 1, 1] , [1.5, 1.5, 6] ]
    ]) {
      image( wvec, ivec, Q );
      vec_equal( ivec, exp , `fail ${wvec} -> ${ivec} != ${exp}`);
    }
    done();
  });

  it("project works", (done) => {
    let wvec = [ 0, 0, 0 ];
    for ( let [ivec, exp] of [
      [ [0, 0, 1] , [-2, -2, 6] ],
      [ [0, 0, -1] , [2, 2, -6] ],
      [ [1, 1, 1] , [0, 0, 6] ],
      [ [2, 2, 1] , [2, 2, 6] ]
    ]) {
      project( ivec, wvec, Q );
      vec_equal( wvec, exp , `fail ${ivec} -> ${wvec} != ${exp}`);
    }
    done();
  });
});

describe("Pinhole Camera class", () => {
  let Q = [
    [ 0, 0, 0, -1 ],
    [ 0, 0, 0, -1 ],
    [ 0, 0, 0, 3  ],
    [ 0, 0, 0.5, 0]
  ];

  it("Constructor works", (done) => {
    let q = new PinholeCameraPair("Q");
    done();
  });

  it("Setters work", (done) => {
    let q = new PinholeCameraPair("Q");
    q.set_Q( Q );
    assert.strictEqual(q.Q, Q);
    done();
  });

  it("methods work", (done) => {
    let q = (new PinholeCameraPair()).set_Q( Q );
    let wvec = [ 1, 1, 1 ];
    let ivec = q.image( wvec );
    vec_equal( ivec, [ 1.5, 1.5, 6 ], "image failed" );
    wvec = q.project([ 1, 1, 1 ]);
    vec_equal( wvec, [ 0, 0, 6 ], "project failed");
    done();
  });
});

