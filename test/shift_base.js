const assert = require('assert');

const {
  shift_vec,
  shift_vec_inv,
  shift_vec_ip,
  shift_vec_ip_inv,
  Shift
} = require('../lib/shift.js');

function vec_equal(a,b,msg) {
  for (let i = 0; i < a.length; i++) 
    if (Math.abs(a[i]-b[i]) > 1e-9) assert.fail(msg ? msg : "");
}


describe("vector methods work", () => {
  
  it("`shift_vec` works", (done) => {

    let vv = [0,0,0];
    let s = [1,0,0];
    for (let [vec, exp] of [
      [ [1,0,0], [2,0,0] ],
      [ [0,1,0], [1,1,0] ],
      [ [0,0,1], [1,0,1] ]
    ]) {
      shift_vec( s, vec, vv );
      vec_equal( vv, exp, `Fail s=${s} + vec=${vec}= ${vv} not ${exp}`);
    }

    s = [0,-1,0];
    for (let [vec, exp] of [
      [ [1,0,0], [1,-1,0] ],
      [ [0,1,0], [0,0,0] ],
      [ [0,0,1], [0,-1,1] ],
    ]) {
      shift_vec( s, vec, vv );
      vec_equal( vv, exp, `Fail s=${s} + vec=${vec}= ${vv} not ${exp}`);
    }
    done();
  });

  it("`shift_vec_inv` works", (done) => {

    let vv = [0,0,0];
    let s = [1,0,0];
    for (let [vec, exp] of [
      [ [1,0,0], [0,0,0] ],
      [ [0,1,0], [-1,1,0] ],
      [ [0,0,1], [-1,0,1] ]
    ]) {
      shift_vec_inv( s, vec, vv );
      vec_equal( vv, exp, `Fail s=${s} + vec=${vec}= ${vv} not ${exp}`);
    }

    s = [0,-1,0];
    for (let [vec, exp] of [
      [ [1,0,0], [1,1,0] ],
      [ [0,1,0], [0,2,0] ],
      [ [0,0,1], [0,1,1] ]
    ]) {
      shift_vec_inv( s, vec, vv );
      vec_equal( vv, exp, `Fail s=${s} + vec=${vec}= ${vv} not ${exp}`);
    }
    done();
  });

  it("`shift_vec_ip` works", (done) => {

    let s = [1,0,0];
    for (let [vec, exp] of [
      [ [1,0,0], [2,0,0] ],
      [ [0,1,0], [1,1,0] ],
      [ [0,0,1], [1,0,1] ]
    ]) {
      shift_vec_ip( s, vec );
      vec_equal( vec, exp, `Fail s=${s} + vec=${vec}= ${vec} not ${exp}`);
    }

    s = [0,-1,0];
    for (let [vec, exp] of [
      [ [1,0,0], [1,-1,0] ],
      [ [0,1,0], [0,0,0] ],
      [ [0,0,1], [0,-1,1] ],
    ]) {
      shift_vec_ip( s, vec );
      vec_equal( vec, exp, `Fail s=${s} + vec=${vec}= ${vec} not ${exp}`);
    }
    done();
  });

  it("`shift_vec_ip_inv` works", (done) => {

    let s = [1,0,0];
    for (let [vec, exp] of [
      [ [1,0,0], [0,0,0] ],
      [ [0,1,0], [-1,1,0] ],
      [ [0,0,1], [-1,0,1] ]
    ]) {
      shift_vec_ip_inv( s, vec );
      vec_equal( vec, exp, `Fail s=${s} + vec=${vec}= ${vec} not ${exp}`);
    }

    s = [0,-1,0];
    for (let [vec, exp] of [
      [ [1,0,0], [1,1,0] ],
      [ [0,1,0], [0,2,0] ],
      [ [0,0,1], [0,1,1] ]
    ]) {
      shift_vec_ip_inv( s, vec );
      vec_equal( vec, exp, `Fail s=${s} + vec=${vec}= ${vec} not ${exp}`);
    }
    done();
  });

});


describe("Shift constructors and mutation", () => {
  
  it("Shift defaults to null", (done) => {
    let s = new Shift();
    vec_equal( s.vec, [0,0,0] );
    done();
  });

  it("Shift created from vector", (done) => {
    let s = Shift.from_vec([1,1,1]);
    vec_equal( s.vec, [1,1,1] );
    done()
  });

  it("Shift mutated by vector", (done) => {
    let s = Shift.from_vec([-1,-1,-1]);
    s.set_vec([1,1,1]);
    vec_equal( s.vec, [1,1,1] );
    done()
  });

  it("Shift mutated as composite", (done) => {
    let s = new Shift();
    let a = Shift.from_vec([1,0,0]);
    let b = Shift.from_vec([0,1,1]);
    s.set_as_composite( a, b );
    vec_equal( s.vec, [1,1,1] );
    done();
  });

});


describe("Shift operations", () => {
  
  it(".add works", (done) => {
    let s = Shift.from_vec([1,0,0]).add(Shift.from_vec([0,1,1]));
    vec_equal( s.vec, [1,1,1] );
    done();
  });

  it(".after works", (done) => {
    let s = Shift.from_vec([1,0,0]).after(Shift.from_vec([0,1,1]));
    vec_equal( s.vec, [1,1,1] );
    done();
  });

  it(".shift works", (done) => {
    let s = Shift.from_vec([1,-1,1]);
    vec_equal( s.shift([ 1, 1, 1 ]), [2, 0, 2] );
    done();
  });

  it(".unshift works", (done) => {
    let s = Shift.from_vec([1,-1,1]);
    vec_equal( s.unshift([ 1, 1, 1 ]), [0, 2, 0] );
    done();
  });

  it(".shift_ip works", (done) => {
    let s = Shift.from_vec([1,-1,1]);
    let vec = [ 1, 1, 1 ];
    s.shift_ip( vec );
    vec_equal( vec , [2, 0, 2] );
    done();
  });

  it(".unshift works", (done) => {
    let s = Shift.from_vec([1,-1,1]);
    let vec = [ 1, 1, 1 ];
    s.unshift_ip( vec );
    vec_equal( vec , [0, 2, 0] );
    done();
  });

});

