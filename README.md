# transformer3d.js
A node.js library for transforming between a 3d coordinate systems. Check it out [here!](https://github.com/jonathanvanschenck/transformer3d)

# Installation
```bash
npm install transformer3d
```

# Basic Usage
The core object for this library is the `CoordinateNetwork`, which allows to user
to build up a graph, where the nodes are various coordinate systems, and the edges
are transformations between the two node pairs. Nodes are identified with some unique
name, and edges are instances of the `transform.Transform` object (or it's many subclasses).

## Vector Transformations
### Euclidean Transformations
#### Basic example
Take for example, a network with two coordinate systems "A" and "B", where the origin of B is 
at the vector `[ 1, 0, 0 ]` in A's coordinate frame. Then the network can be built up as:
```javascript
const { CoordinateNetwork, transform } = require('transformer3d');

// Initialize the network
const net = new CoordinateNetwork();

// Attach the A and B coordinate system
net.connect_systems(
  "A", 
  new transform.ShiftStaticTransform([ 1, 0, 0]), // B is at [1,0,0] in A's frame
  "B"
);

// Tell the network that you are done adding coordinate systems
net.compile();

// Transform [1,0,0] in A's frame to B's frame
net.transform_vec([1,0,0], "A", "B"); // returns [2,0,0]

// Tranform [0, 2, 0] in B's frame to A's frame
net.tranform_vec([0,2,0], "B", "A"); // returns [-1,2,0]
```

If instead of being shifted relative to one another, B was rotated 90 degrees around the x-axis
relative to A:
```javascript
// Initialize the network
const net = new CoordinateNetwork();

// Attach the A and B coordinate system
net.connect_systems(
  "A", 
  //                                  +90 deg     around x
  new transform.RotateStaticTransform(Math.PI/2, [ 1, 0, 0]),
  "B"
);

// Tell the network that you are done adding coordinate systems
net.compile();

// Transform [0,1,0] in A's frame to B's frame
net.transform_vec([0,1,0], "A", "B"); // returns [0,0,1]

// Tranform [0, 2, 0] in B's frame to A's frame
net.tranform_vec([0,2,0], "B", "A"); // returns [0,0,-2]
```

As a rule, methods which mutate a `transformer3d` object will
return a reference to the object itself, so many set up methods
can be changed together:
```javascript
// Same as the previous example
const net = (new CoordinateNetwork())
  .connect_systems("A", new transform.RotateStaticTransform(Math.PI/2, [ 1, 0, 0]), "B")
  .compile();

net.transform_vec([0,1,0], "A", "B"); // returns [0,0,1]
```
#### Many connections
Coordinate systems need to only specify the minimal number of connections, and the
network can compile the rest of the connections. So, if you have coordinate systems
A, B, C and D, you don't need to explicitly specify the connection between A and D,
if you have specified the connection between A to B, B to C and C to D.
```javascript
const net = (new CoordinateNetwork())
  .connect_systems("A", new transform.ShiftStaticTransform([1,0,0]), "B")
  .connect_systems("B", new transform.ShiftStaticTransform([1,0,0]), "C")
  .connect_systems("C", new transform.ShiftStaticTransform([1,0,0]), "D")
  .compile();

net.transform_vec([0,0,0], "A", "D"); // returns [3,0,0]
```

That being said, if you happen to know the explicit connection between A and D,
and tell the network, it will be able to evaluate that transformation much more
quickly (becuase it will not need to route through B and C).

```javascript
const net = (new CoordinateNetwork())
  .connect_systems("A", new transform.ShiftStaticTransform([1,0,0]), "B")
  .connect_systems("B", new transform.ShiftStaticTransform([1,0,0]), "C")
  .connect_systems("C", new transform.ShiftStaticTransform([1,0,0]), "D")
  .connect_systems("A", new transform.ShiftStaticTransform([3,0,0]), "D") // provide shortcut
  .compile();

net.transform_vec([0,0,0], "A", "D"); // returns [3,0,0] much faster
```

The more connections you provide, the faster the network can evaluate transformations

#### Dynamic Connections
Sometimes a coordinate transformation is dependent upon some external data which is either
not available at the time of instantiation, or will periodically change. This can be handled
by using 'Dynamic' transformation objects, together with the `CoordinateNetwork.update` method

```javascript
const net = (new CoordinateNetwork())
  .connect_systems(
    "A", 
    //                            object key for data
    new transform.ShiftDynamicTransform("A_to_B_shift"), 
    "B"
  ).compile();

// some time later
net.update({ A_to_B_shift : [1,0,0] })
net.transform_vec([0,0,0], "A", "B"); // returns [1,0,0]

// some time even later
net.update({ A_to_B_shift : [3,0,0] })
net.transform_vec([0,0,0], "A", "B"); // returns [3,0,0]
```

Check out [the full API](API.md#module_transform) for details on using dynamic connections

#### Connection to Affine Transformations
A common alternative to the quaternion approach used in this library is to implement coordinate
transformations using matrix multiplication. This is often construed as a subset of affine
transformations, where the matrix part is required to be determinant 1. The basic form of an
affine transformation is:
```
v'^T = A * v^T + b^T
```
where v and v' are row vectors for before and after the affine transformation, A is the matrix
part (the rotation) and b is the vector part (the shift). These rotate and shift operations are
accomplished in this library using the `quaternion.UnitQuaternion` and `shift.Shift` classes,
but it is possible to convert between the two representations. For example:
```javascript
const { Euclidean } = require('transformer3d').euclidean;
const { UnitQuaternion } = require('transformer3d').quaternion;
const { Shift } = require('transformer3d').shift;
euc = new Euclidean();
q = UnitQuaternion.from_axis( Math.PI/4, [0,0,1] ); // rotate 45 deg about z axis
s = Shift.from_vec([0,0,1]);                        // shift 1 unit in z
euc.set_objects( q, s );

euc.affine; // returns { A : [[1/sqrt(2),1/sqrt(2),0],[-1/sqrt(2),1/sqrt(2),0],[0,0,1]], B : [0,0,1] }
```

Note that `network.CoordinateNetwork` instances are also aware of affine transformations too, so that
you can get the total equivalent affine transformation for any two coordinate systems which are connected
by Euclidean-type transformations:
```javascript
const { transform, CoordinateNetwork } = require('transformer3d');

let net = new CoordinateNetwork();
net.connect_systems("A", transform.ShiftStaticTransform([0,1,0]), "B") // B is 1 unit shifted from A in y dir
net.connect_systems("B", transform.RotateStaticTransform(Math.PI/2, [1,0,0]), "C") // C is rotated 90 about x from B
net.compile();

net.get_affine("A","B"); // returns { A : [[1,0,0],[0,1,0],[0,0,1]], b : [0,1,0] }
net.get_affine("A","C"); // returns { A : [[0,1,0],[-1,0,0],[0,0,1]], b : [1,0,0] }
```

Notice in that last case that the affine shift `b : [1,0,0]` is in the coordinate system of 'C', since
affine transformations always apply their shifts at the end, even though the network would apply the 
shift from "A" to "B" *before* rotating from "B" to "C".

As a final note, the `net.get_affine` method will only work if all the internal transformations between
the two coordinate systems are Euclidean-type. If any non-Euclidean transformations are present in the
chain between the two endpoints, the method will throw an error. This is because generic transformation
objects are not guaranteed to have an effect affine transformation equivalent (e.g. the `transform.PinholeCameraTransform`
is distinctly *not* affine in nature, since disparity and distance are inversely related to one another).

### Pinhole Camera Transformations
This library also has limited support for transforming between pixel-space (i, j and disparity)
and world-space (X, Y, Z) for a pair of stereocalibrated cameras, following the conventions
of [OpenCV](https://docs.opencv.org). You can [see here](https://docs.opencv.org/3.4/d9/d0c/group__calib3d.html#ga91018d80e2a93ade37539f01e6f07de5)
for a discussion of stereorectifying a pair of cameras, and [see here](https://docs.opencv.org/3.4/d9/d0c/group__calib3d.html#details)
and [here](https://docs.opencv.org/3.4/d9/d0c/group__calib3d.html#ga617b1685d4059c6040827800e72ad2b6)
for a futher discussion of the details of disparity imaging.
```javascript
const net = (new CoordinateNetwork())
  .connect_systems("world", new transform.PinholeCameraTransform("Q" /* data key */), "image")
  .compile()
  .update({ Q : [[1,0,0,-50],[0,1,0,-50],[0,0,1,100],[0,0,0.1,0]] }); // set Q matrix

net.transform_vec([0, 0, 10], "world", "image"); // projects vector into an image
```

### Homogeneous Transformations
Just like with affine transformations, this library also exposes transformations for [homogeneous coordinates](https://en.wikipedia.org/wiki/Homogeneous_coordinates)
. Briefly, homogeneous coordinates are a coordinate representation in `n+1` dimensions, in our case
this means coordinates are expressed as `[ x, y, z, w ]`, where the 3d vector can be recovered as
`[ x/w, y/w, z/w ]`. A homogeneous (also called projective) transformation is then any 4x4 matrix
which operates on the homogeneous coordinates. All affine transformations can be expressed as 
a homogeneous transformation, but the pinhole camera transformation (discussed above) can also
be expressed as a homogeneous transformation.

`CoordinateNetwork` instances expose a method `.get_homogeneous( start, end )` which will return
the homogeneous transformation which is equivalent to the transformation between `start` and `end`.
Note that just like for affine transformations, this method will only work if all the subtransformations
between `start` and `end` are homogeneous-compatible (this includes `transform.PinholeCameraTransform`
and all `transform.EuclideanTransformMixin` derivatives). The method will return the 4x4 matrix for which
the following are equivalent:

```javascript
const net = (new CoordinateNetwork())
  .connect_systems("camera", new transform.PinholeCameraTransform("Q" /* data key */), "image")
  .connect_systems("world", new transform.ShiftStaticTransform([0,0,1]), "camera") // the world is 1m below the camera
  .compile()
  .update({ Q : [[1,0,0,-50],[0,1,0,-50],[0,0,1,100],[0,0,0.1,0]] }); // set Q matrix

// Use the network to transform a vector
let [i,j,d] = net.transform_vec([0, 0, 10], "world", "image");

// Get the homogeneous matrix and transform the vector yourself
let mat = net.get_homogeneous( "world", "image" ); // 4x4 matrix
let world_vec = [0,0,10,1]; // same world vector in homogeneous coordinates
// compute matrix product: img_vec^T = mat * world_vec^T
let img_vec = [0,0,0,0]; 
for ( let _i = 0; _i < 4; _i ++ ) {
  for ( let _j = 0; _j < 4; _j ++) {
      img_vec[_i] += mat[_i][_j] * world_vec[_j]
    }
}
let [ ip, jp, dp, wp ] = img_vec;

i === ip / wp; // returns True
j === jp / wp; // returns True
d === dp / wp; // returns True
```

## Quaternion Transformations
This library, in addition to transforming 3d vectors, allows supports transforming
rigid body orientations in the form of unit quaternions (`UnitQuaternion` class).
In this construction, the unit quaternion is imagined to represent the rotation
required to transform a reference object orientation into a new orientation. For
example, if an objects orientation is "rotated 90 degrees around the x-axis from
the starting point", this is represented as `q = 0.707 + 0.707i + 0j + 0k`, and 
can be generated using:
```javascript
const { UnitQuaternion } = require('transformer3d');

let q = UnitQuaternion.from_axis(
  Math.PI/2, // Angle
  [1,0,0]    // Axis
)
```

Suppose that there is another coordinate reference frame B which is reached from A by
rotating around A's z-axis by +90 degrees. One can transform the quaternion `q` to express
it's orientation relative to the B axis via the following:
```javascript
const net = (new CoordinateNetwork())
  .connect_systems("A", new transform.RotateStaticTransform( Math.PI/2, [0,0,1] ), "B")
  .compile();

net.orient_quat(q); // returns q', which is the same orientation as q, but referenced against B
```

# Advanced Usage
See the [full API](API.md) for more details on advanced usage.

# Development notes
The author welcomes any feedback, pull requests, feature request, and forks!

# Known Bugs
 - If the real part of a `UnitQuaternion` is negative, that might produce some
 strange behavoir with some of the composite getter functions, like `.angle`

# TODO
 - Finish commenting the pinhole camera module
 - Consider removing `.transform_quat` from the transform module, since is is pretty niche
 - Should in place transformations return the mutated object, or `undefined`? c.f. `Euclidean.transform_vec_ip`
 - Should the quaternion module just be a separate npm pacakge?

