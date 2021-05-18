const assert = require('assert');


const { 
  CoordinateSystem,
  CoordinateNetwork
} = require('../lib/network.js');

const t = require('../lib/transform.js');
const UQ = require('../lib/quaternion.js').UnitQuaternion;

function vec_equal(a,b,msg) {
  for (let i = 0; i < a.length; i++) 
    if (a[i] !== b[i]) assert.fail(msg ? msg : "");
}

function vec_equal_approx (a, b, msg) {
  for (let i = 0; i < a.length; i++) 
    if (Math.abs(a[i] - b[i]) > 1e-9) assert.fail(msg ? msg : "");
}

function mult(a,b,i,k,j) {
  let r = [];
  for (let _i = 0; _i < i; _i ++ ) {
    r[_i] = [];
    for (let _j = 0; _j < j; j ++) {
      r[_i][_j] = 0;
      for (let _k = 0; _k < k; k ++ ) {
        r[_i][_j] += a[_i][_k] * b[_k][_j];
      }
    }
  }
  return r;
}

function mat_equal_approx (a, b, msg) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j ++) {
      if (Math.abs(a[i][j] - b[i][j]) > 1e-9) assert.fail((msg ? msg : "") + `a[${i}][${j}]=${a[i][j]} vs b[${i}][${j}]=${b[i][j]}`);
    }
  }
}

describe("Coordinate System constructors", () => {
  
  it("Coordinate System basic construction", (done) => {
    let c = new CoordinateSystem("a");
    assert.strictEqual(c.name, "a");
    done();
  });
});


describe("Coordinate Network Constructors", () => {
  
  it("Network basic construction", (done) => {
    
    let n = new CoordinateNetwork();
    assert.equal(Object.values(n.systems).length, 0);
    done();
  });

  it("Network instantiates new systems", (done) => {
    
    let n = new CoordinateNetwork();
    n.connect_systems("a", new t.Transform(), "b");
    assert.equal(n.systems.a.name, "a");
    assert.equal(n.systems.b.name, "b");
    done();
  });

  it("Network doesn't re-initialize new systems", (done) => {
    
    let n = new CoordinateNetwork();
    n.connect_systems("a", new t.Transform(), "b");
    n.connect_systems("a", new t.Transform(), "b");
    assert.equal(Object.values(n.systems).length, 2);
    done();
  });

  it("Compilation generates a fully connected system", (done) => {
    
    let n = (new CoordinateNetwork())
         .connect_systems("a", new t.Transform(), "b")
         .connect_systems("b", new t.Transform(), "c")
         .connect_systems("b", new t.Transform(), "d")
         .connect_systems("d", new t.Transform(), "e")
         .connect_systems("e", new t.Transform(), "f")
         .connect_systems("f", new t.Transform(), "c")
         .connect_systems("y", new t.Transform(), "z")
         .compile();
    
    vec_equal(n.systems.a.downstream.f, ["b", "c", "f"], "Fail a->f" );
    vec_equal(n.systems.a.downstream.e, ["b", "d", "e"], "Fail a->e" );
    vec_equal(n.systems.f.downstream.a, ["c", "b", "a"], "Fail f->e" );
    vec_equal(n.systems.z.downstream.y, ["y"], "Fail z->y" );
    assert.equal(n.systems.a.downstream.z, undefined, "Fail a -> z");
    done();
  })
});


describe("Vector Transformations with Networks", () => {
  
  let n = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftStaticTransform([1,0,0]), "b")
       .connect_systems("b", new t.ShiftStaticTransform([0,1,0]), "c")
       .connect_systems("b", new t.ShiftStaticTransform([0,0,1]), "d")
       .connect_systems("d", new t.ShiftStaticTransform([0,0,1]), "e")
       .connect_systems("e", new t.ShiftStaticTransform([0,0,-2]), "f")
       .connect_systems("f", new t.ShiftStaticTransform([0,1,0]), "c")
       .connect_systems("y", new t.ShiftStaticTransform([1,1,1]), "z")
       .compile();

  it("Tranform across a single gap work", (done) => {
    vec_equal(n.transform_vec([0,0,0], "a", "b"), [1,0,0], `fail a->b`);
    done();
  });

  it("Non-existent systems cannot be transform_veced w.r.t.", (done) => {
    assert.strict.throws(() => {
      n.transform_vec([0,0,0], "q", "b");
    }, Error, "fail, tried to transform_vec non-existent q");
    done();
  });

  it("Unconnected nodes cannot be transform_veced", (done) => {
    assert.strict.throws(() => {
      n.transform_vec([0,0,0], "a", "z");
    }, Error, "fail, tried to transform_vec a to z");
    done();
  });

  it("Tranforms across a multiple gaps works", (done) => {
    let res = n.transform_vec([0,0,0], "a", "c");
    vec_equal(res, [1,1,0], `fail a->c ${res}`);

    res = n.transform_vec([0,0,0], "a", "d");
    vec_equal(res, [1,0,1], `fail a->d ${res}`);

    res = n.transform_vec([0,0,0], "a", "f");
    vec_equal(res, [1,0,0], `fail a->f ${res}`);
    done();
  });

  let n2 = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftDynamicTransform("atb"), "b")
       .connect_systems("b", new t.ShiftDynamicTransform("btc"), "c")
       .compile();

  it("network.update works", (done) => {
    
    n2.update({ atb : [1,0,0], btc : [0,1,0] });
    let res = n2.transform_vec([0,0,0], "a", "c");
    vec_equal(res, [1,1,0], `fail a->c first ${res}`);
    
    n2.update({ atb : [2,0,0], btc : [0,2,0] });
    res = n2.transform_vec([0,0,0], "a", "c");
    vec_equal(res, [2,2,0], `fail a->c second ${res}`);
    
    done();
  });
});

describe("Quaternion tranforms and orientations with networks",() => {
   
  let n = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftStaticTransform([1,0,0]), "b")
       .connect_systems("b", new t.RotateStaticTransform(-Math.PI/2, [1,0,0]), "c")
       .connect_systems("c", new t.RotateStaticTransform(Math.PI/2, [0,1,0]), "d")
       .compile();

  let isqrt2 = 1/Math.sqrt(2);

  it("Tranform quats over a single gap works", (done) => {
    let q, q2;

    q = UQ.from_axis(Math.PI/2, [1,0,0]);

    // Test no op
    q2 = n.transform_quat(q, "a", "b");
    vec_equal_approx(q2.qvec, [isqrt2, isqrt2, 0, 0], "fail a->b");

    // Test rotation in same direction
    // x * x * ~x = x
    q2 = n.transform_quat(q, "b", "c");
    vec_equal_approx(q2.qvec, [isqrt2, isqrt2, 0, 0], "fail b->c");

    // Test rotation in opposite directions
    // ~y * x * y = z
    q2 = n.transform_quat(q, "c", "d");
    vec_equal_approx(q2.qvec, [isqrt2, 0, 0, isqrt2], "fail c->d");

    // Test back transforms
    // y * x * ~y = -z
    q2 = n.transform_quat(q, "d", "c");
    vec_equal_approx(q2.qvec, [isqrt2, 0, 0, -isqrt2], "fail d->c");


    done();
  });

  it("Tranform quats over a multiple gaps works", (done) => {
    let q, q2;

    q = UQ.from_axis(Math.PI/2, [1,0,0]);

    // Test no op then rotate
    // x * x * ~x = x
    q2 = n.transform_quat(q, "a", "c");
    vec_equal_approx(q2.qvec, [isqrt2, isqrt2, 0, 0], "fail a->c");
    
    // Test forward direction
    // ~y * x * x * ~x * y = ~y * x * y = z
    q2 = n.transform_quat(q, "a", "d");
    vec_equal_approx(q2.qvec, [isqrt2, 0,0, isqrt2], "fail a->d");
    
    // Test reverse direction
    // ~x * y * x * ~y * x = ~x * ~z * x = ~y
    q2 = n.transform_quat(q, "d", "a");
    vec_equal_approx(q2.qvec, [isqrt2, 0, -isqrt2, 0], "fail d->a");

    done();
  });
}); 


describe("Affine transformations",() => {
   
  let n = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftStaticTransform([0,1,0]), "b")
       .connect_systems("b", new t.RotateStaticTransform(-Math.PI/2, [1,0,0]), "c")
       .connect_systems("c", new t.RotateStaticTransform(Math.PI/2, [0,1,0]), "d")
       .connect_systems("d", new t.PinholeCameraTransform("Q"), "e")
       .compile();

  let isqrt2 = 1/Math.sqrt(2);

  it("Failure for non euclideans", (done) => {
    
    assert.strict.throws(() => {
      n.get_affine("d","e");
    }, Error, "Fail, one step");
    
    assert.strict.throws(() => {
      n.get_affine("a","e");
    }, Error, "Fail, many step");

    done();
  });


  it("Can get identity affine", (done) => {
    
    let aff = n.get_affine("b", "b");

    vec_equal_approx([0,0,0], aff.b, "fail vec");
    aff.A.forEach((r,i) => {
      let v = [0,0,0];
      v[i] = 1;
      vec_equal_approx(r,v, "fail row " + i);
    });
    done();
  });

  it("Can get affine composite", (done) => {
    
    let aff = n.get_affine("a", "d");
    vec_equal_approx([-1,0,0], aff.b, "fail vec");
    let exp1 = [[1,0,0],[0,0,-1],[0,1,0]]; // rotate -90 about x
    let exp2 = [[0,0,-1],[0,1,0],[1,0,0]]; // rotate 90 about y
    // exp = exp2 * exp1
    let exp = new Array(3);
    for ( let i = 0; i < 3; i ++ ) {
      exp[i] = new Array(3);
      for ( let j = 0; j < 3; j ++ ) {
        exp[i][j] = 0;
        for ( let k = 0; k < 3; k ++ ) {
          exp[i][j] += exp2[i][k]*exp1[k][j];
        }
      }
    }
    aff.A.forEach((r,i) => {
      vec_equal_approx(r,exp[i], "fail row " + i);
    });
    done();
  });

  it("Can get affine in reverse", (done) => {
    
    let aff = n.get_affine("d", "a");
    vec_equal_approx([0,-1,0], aff.b, "fail vec");
    let exp1 = [[1,0,0],[0,0,1],[0,-1,0]]; // rotate 90 about x
    let exp2 = [[0,0,1],[0,1,0],[-1,0,0]]; // rotate -90 about y
    // exp = exp2 * exp1
    let exp = new Array(3);
    for ( let i = 0; i < 3; i ++ ) {
      exp[i] = new Array(3);
      for ( let j = 0; j < 3; j ++ ) {
        exp[i][j] = 0;
        for ( let k = 0; k < 3; k ++ ) {
          exp[i][j] += exp1[i][k]*exp2[k][j];
        }
      }
    }
    aff.A.forEach((r,i) => {
      vec_equal_approx(r,exp[i], "fail row " + i);
    });
    done();
  });
}); 

describe("Homogeneous Transformations",() => {
   
  let n = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftStaticTransform([0,1,0]), "b")
       .connect_systems("b", new t.RotateStaticTransform(-Math.PI/2, [1,0,0]), "c")
       .connect_systems("c", new t.RotateStaticTransform(Math.PI/2, [0,1,0]), "d")
       .connect_systems("d", new t.PinholeCameraTransform("Q"), "e")
       .connect_systems("e", new t.Transform(), "f")
       .compile()
       .update({ Q : [
          [ 1, 0, 0,  -1],
          [ 0, 1, 0,  -1],
          [ 0, 0, 0,   3],
          [ 0, 0, 0.5, 0]
        ]});

  let isqrt2 = 1/Math.sqrt(2);

  it("Failure for non euclideans", (done) => {
    
    assert.strict.throws(() => {
      n.get_homogeneous("e","f");
    }, Error, "Fail, one step");
    
    assert.strict.throws(() => {
      n.get_homogeneous("a","f");
    }, Error, "Fail, many step");

    done();
  });


  it("Can get identity homogeneous", (done) => {
    
    let mat = n.get_homogeneous("b", "b");
    mat_equal_approx(mat, [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], "fail identity");
    done();
  });

  it("Can get homogeneous singles", (done) => {
    
    let mat = n.get_homogeneous("a", "b");
    mat_equal_approx(mat, [[1,0,0,0],[0,1,0,1],[0,0,1,0],[0,0,0,1]], "fail shift");
    mat = n.get_homogeneous("b", "c");
    mat_equal_approx(mat, [[1,0,0,0],[0,0,-1,0],[0,1,0,0],[0,0,0,1]], "fail rotate");
    mat = n.get_homogeneous("c", "d");
    mat_equal_approx(mat, [[0,0,-1,0],[0,1,0,0],[1,0,0,0],[0,0,0,1]], "fail rotate2");
    mat = n.get_homogeneous("e", "d");
    mat_equal_approx(mat, [
    [ 1, 0, 0,  -1],
    [ 0, 1, 0,  -1],
    [ 0, 0, 0,   3],
    [ 0, 0, 0.5, 0]
  ], "fail pinhole");
    done();
  });

  it("Can get homogeneous composite", (done) => {
    
    let mat = n.get_homogeneous("a", "c");
    let exp = [[1,0,0,0],[0,0,-1,0],[0,1,0,1],[0,0,0,1]];
    mat_equal_approx(mat, exp, "fail euclidean composite");

    mat = n.get_homogeneous("c", "e");
    exp = [[ 1/3,  0.        , -1.        ,  0.        ],
           [ 1/3,  1.        ,  0.        ,  0.        ],
           [ 0. ,  0.        ,  0.        ,  2.        ],
           [ 1/3,  0.        ,  0.        ,  0.        ]]
    mat_equal_approx(mat, exp, "fail full composite");
    done();
  });

  it("Can get homogeneous in reverse", (done) => {
    
    let mat = n.get_homogeneous("c", "a");
    let exp = [[1,0,0,0],[0,0,1,-1],[0,-1,0,0],[0,0,0,1]];
    mat_equal_approx(mat, exp, "fail euclidean composite");

    mat = n.get_homogeneous("e", "c");
    exp = [[ 0. ,  0. ,  0. ,  3. ],
           [ 0. ,  1. ,  0. , -1. ],
           [-1. ,  0. ,  0. ,  1. ],
           [ 0. ,  0. ,  0.5,  0. ]];
    mat_equal_approx(mat, exp, "fail full composite");
    done();
  });
}); 
