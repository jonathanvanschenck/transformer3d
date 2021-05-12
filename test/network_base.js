const assert = require('assert');


const { 
  CoordinateSystem,
  CoordinateNetwork
} = require('../lib/network.js');

const t = require('../lib/transform.js');

function vec_equal(a,b,msg) {
  for (let i = 0; i < a.length; i++) 
    if (a[i] !== b[i]) assert.fail(msg ? msg : "");
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


describe("Coordinate Transformations", () => {
  
  let n = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftStaticTransform([1,0,0]), "b")
       .connect_systems("b", new t.ShiftStaticTransform([0,1,0]), "c")
       .connect_systems("b", new t.ShiftStaticTransform([0,0,1]), "d")
       .connect_systems("d", new t.ShiftStaticTransform([0,0,1]), "e")
       .connect_systems("e", new t.ShiftStaticTransform([0,0,-2]), "f")
       .connect_systems("f", new t.ShiftStaticTransform([0,1,0]), "c")
       .connect_systems("y", new t.ShiftStaticTransform([1,1,1]), "z")
       .compile();

  it("Tranforms across a single gap work", (done) => {
    vec_equal(n.transform([0,0,0], "a", "b"), [1,0,0], `fail a->b`);
    done();
  });

  it("Non-existent systems cannot be transformed w.r.t.", (done) => {
    assert.strict.throws(() => {
      n.transform([0,0,0], "q", "b");
    }, Error, "fail, tried to transform non-existent q");
    done();
  });

  it("Unconnected nodes cannot be transformed", (done) => {
    assert.strict.throws(() => {
      n.transform([0,0,0], "a", "z");
    }, Error, "fail, tried to transform a to z");
    done();
  });

  it("Tranforms across a multiple gaps works", (done) => {
    let res = n.transform([0,0,0], "a", "c");
    vec_equal(res, [1,1,0], `fail a->c ${res}`);

    res = n.transform([0,0,0], "a", "d");
    vec_equal(res, [1,0,1], `fail a->d ${res}`);

    res = n.transform([0,0,0], "a", "f");
    vec_equal(res, [1,0,0], `fail a->f ${res}`);
    done();
  });

  let n2 = (new CoordinateNetwork())
       .connect_systems("a", new t.ShiftDynamicTransform("atb"), "b")
       .connect_systems("b", new t.ShiftDynamicTransform("btc"), "c")
       .compile();

  it("network.update works", (done) => {
    
    n2.update({ atb : [1,0,0], btc : [0,1,0] });
    let res = n2.transform([0,0,0], "a", "c");
    vec_equal(res, [1,1,0], `fail a->c first ${res}`);
    
    n2.update({ atb : [2,0,0], btc : [0,2,0] });
    res = n2.transform([0,0,0], "a", "c");
    vec_equal(res, [2,2,0], `fail a->c second ${res}`);
    
    done();
  });
});
