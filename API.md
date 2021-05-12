## Modules

<dl>
<dt><a href="#module_euclidean">euclidean</a></dt>
<dd><p>Euclidean objects for roto-translations of 3d vectors. This is a double cover of SE(3), the
special Euclidean group in 3 dimensions.</p>
</dd>
<dt><a href="#module_network">network</a></dt>
<dd><p>A module for modeling networks of coordintate axes, and the transformations betwen them</p>
</dd>
<dt><a href="#module_quaternion">quaternion</a></dt>
<dd><p>Quaternion objects for rotation of 3d vectors. This is double cover of SO(3), the special orthogonal
group in 3 dimensions.</p>
</dd>
<dt><a href="#module_shift">shift</a></dt>
<dd><p>Shift objects for shifting 3d vectors. This is single cover of T(3), the translation group in 3 dimensions.</p>
</dd>
<dt><a href="#module_transform">transform</a></dt>
<dd><p>Transformation objects for coordinate transformations of 3d vectors</p>
</dd>
</dl>

<a name="module_euclidean"></a>

## euclidean
Euclidean objects for roto-translations of 3d vectors. This is a double cover of SE(3), the
special Euclidean group in 3 dimensions.


* [euclidean](#module_euclidean)
    * [~Euclidean](#module_euclidean..Euclidean)
        * [new Euclidean()](#new_module_euclidean..Euclidean_new)
        * [.translation](#module_euclidean..Euclidean+translation) ⇒ <code>Array.&lt;number&gt;</code>
        * [.set_vecs(qvec, vec)](#module_euclidean..Euclidean+set_vecs) ⇒ <code>this</code>
        * [.set_objects(quat, shift)](#module_euclidean..Euclidean+set_objects) ⇒ <code>this</code>
        * [.set_as_composite(first, second)](#module_euclidean..Euclidean+set_as_composite) ⇒ <code>this</code>
        * [.transform_vec(vec)](#module_euclidean..Euclidean+transform_vec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.transform_vec_ip(vec)](#module_euclidean..Euclidean+transform_vec_ip) ⇒ <code>undefined</code>
        * [.untransform_vec(vec)](#module_euclidean..Euclidean+untransform_vec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.untransform_vec_ip(vec)](#module_euclidean..Euclidean+untransform_vec_ip) ⇒ <code>undefined</code>
        * [.transform_quat(quat)](#module_euclidean..Euclidean+transform_quat) ⇒ <code>UnitQuaternion</code>
        * [.transform_quat_ip(quat)](#module_euclidean..Euclidean+transform_quat_ip) ⇒ <code>undefined</code>
        * [.untransform_quat(quat)](#module_euclidean..Euclidean+untransform_quat) ⇒ <code>UnitQuaternion</code>
        * [.untransform_quat_ip(quat)](#module_euclidean..Euclidean+untransform_quat_ip) ⇒ <code>undefined</code>
    * [~EuclideanReverse](#module_euclidean..EuclideanReverse)

<a name="module_euclidean..Euclidean"></a>

### euclidean~Euclidean
Euclidean (roto-translation) objects for 3d vectors

These follow affine transformation conventions, where the rotation
is applied before the shift.

**Kind**: inner class of [<code>euclidean</code>](#module_euclidean)  

* [~Euclidean](#module_euclidean..Euclidean)
    * [new Euclidean()](#new_module_euclidean..Euclidean_new)
    * [.translation](#module_euclidean..Euclidean+translation) ⇒ <code>Array.&lt;number&gt;</code>
    * [.set_vecs(qvec, vec)](#module_euclidean..Euclidean+set_vecs) ⇒ <code>this</code>
    * [.set_objects(quat, shift)](#module_euclidean..Euclidean+set_objects) ⇒ <code>this</code>
    * [.set_as_composite(first, second)](#module_euclidean..Euclidean+set_as_composite) ⇒ <code>this</code>
    * [.transform_vec(vec)](#module_euclidean..Euclidean+transform_vec) ⇒ <code>Array.&lt;number&gt;</code>
    * [.transform_vec_ip(vec)](#module_euclidean..Euclidean+transform_vec_ip) ⇒ <code>undefined</code>
    * [.untransform_vec(vec)](#module_euclidean..Euclidean+untransform_vec) ⇒ <code>Array.&lt;number&gt;</code>
    * [.untransform_vec_ip(vec)](#module_euclidean..Euclidean+untransform_vec_ip) ⇒ <code>undefined</code>
    * [.transform_quat(quat)](#module_euclidean..Euclidean+transform_quat) ⇒ <code>UnitQuaternion</code>
    * [.transform_quat_ip(quat)](#module_euclidean..Euclidean+transform_quat_ip) ⇒ <code>undefined</code>
    * [.untransform_quat(quat)](#module_euclidean..Euclidean+untransform_quat) ⇒ <code>UnitQuaternion</code>
    * [.untransform_quat_ip(quat)](#module_euclidean..Euclidean+untransform_quat_ip) ⇒ <code>undefined</code>

<a name="new_module_euclidean..Euclidean_new"></a>

#### new Euclidean()
Constructor

<a name="module_euclidean..Euclidean+translation"></a>

#### euclidean.translation ⇒ <code>Array.&lt;number&gt;</code>
Get the effective shift post rotation

**Kind**: instance property of [<code>Euclidean</code>](#module_euclidean..Euclidean)  
**Returns**: <code>Array.&lt;number&gt;</code> - 3d vector of shift  
<a name="module_euclidean..Euclidean+set_vecs"></a>

#### euclidean.set\_vecs(qvec, vec) ⇒ <code>this</code>
Set the vectors for the quaternion and shift

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| qvec | <code>Array.&lt;number&gt;</code> | the rotation quaternion vector: `[re, i, j, k]` |
| vec | <code>Array.&lt;number&gt;</code> | the 3d shift vector |

<a name="module_euclidean..Euclidean+set_objects"></a>

#### euclidean.set\_objects(quat, shift) ⇒ <code>this</code>
Set the internal quaternion and shift objects

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the rotation quaternion |
| shift | <code>Shift</code> | the shift |

<a name="module_euclidean..Euclidean+set_as_composite"></a>

#### euclidean.set\_as\_composite(first, second) ⇒ <code>this</code>
Set this as the composite of two other (Reverse)Euclidean transformations

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>Euclidean</code> \| <code>ReverseEuclidean</code> | the first transform to be applied |
| second | <code>Euclidean</code> \| <code>ReverseEuclidean</code> | the second transform to be applied |

<a name="module_euclidean..Euclidean+transform_vec"></a>

#### euclidean.transform\_vec(vec) ⇒ <code>Array.&lt;number&gt;</code>
Transform a vector with this rotation and shift

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  
**Returns**: <code>Array.&lt;number&gt;</code> - the transformed vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to be transformed |

<a name="module_euclidean..Euclidean+transform_vec_ip"></a>

#### euclidean.transform\_vec\_ip(vec) ⇒ <code>undefined</code>
Transform a vector with this rotation and shift in place

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to be transformed in place |

<a name="module_euclidean..Euclidean+untransform_vec"></a>

#### euclidean.untransform\_vec(vec) ⇒ <code>Array.&lt;number&gt;</code>
Undo a transform of a vector with this rotation and shift

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  
**Returns**: <code>Array.&lt;number&gt;</code> - the untransformed vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to be untransformed |

<a name="module_euclidean..Euclidean+untransform_vec_ip"></a>

#### euclidean.untransform\_vec\_ip(vec) ⇒ <code>undefined</code>
Undo a transform of a vector with this rotation and shift in place

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to be untransformed in place |

<a name="module_euclidean..Euclidean+transform_quat"></a>

#### euclidean.transform\_quat(quat) ⇒ <code>UnitQuaternion</code>
Transform an orientation quaternion with this coordinate rotation

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  
**Returns**: <code>UnitQuaternion</code> - the transformed quaternion  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the orientation quaternion to be transformed |

<a name="module_euclidean..Euclidean+transform_quat_ip"></a>

#### euclidean.transform\_quat\_ip(quat) ⇒ <code>undefined</code>
Transform an orientation quaternion with this coordinate rotation in place

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the orientation quaternion to be transformed in place |

<a name="module_euclidean..Euclidean+untransform_quat"></a>

#### euclidean.untransform\_quat(quat) ⇒ <code>UnitQuaternion</code>
Undo a transform of an orientation quaternion with this coordinate rotation

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  
**Returns**: <code>UnitQuaternion</code> - the untransformed quaternion  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the orientation quaternion to be untransformed |

<a name="module_euclidean..Euclidean+untransform_quat_ip"></a>

#### euclidean.untransform\_quat\_ip(quat) ⇒ <code>undefined</code>
Undo a transform of an orientation quaternion with this coordinate rotation in place

**Kind**: instance method of [<code>Euclidean</code>](#module_euclidean..Euclidean)  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the orientation quaternion to be untransformed in place |

<a name="module_euclidean..EuclideanReverse"></a>

### euclidean~EuclideanReverse
Reverse Euclidean (roto-translation) objects for 3d vectors

This is almost exactly the same as Euclidean, except the shifts 
is applied before the rotation.

**Kind**: inner class of [<code>euclidean</code>](#module_euclidean)  
<a name="module_network"></a>

## network
A module for modeling networks of coordintate axes, and the transformations betwen them


* [network](#module_network)
    * [~CoordinateNetwork](#module_network..CoordinateNetwork)
        * [new CoordinateNetwork()](#new_module_network..CoordinateNetwork_new)
        * [.connect_systems(first, tranform, second, [one_way])](#module_network..CoordinateNetwork+connect_systems) ⇒ <code>this</code>
        * [.compile()](#module_network..CoordinateNetwork+compile) ⇒ <code>this</code>
        * [.update(state)](#module_network..CoordinateNetwork+update) ⇒ <code>this</code>
        * [.transform_quat(quat, start_name, end_name)](#module_network..CoordinateNetwork+transform_quat) ⇒ <code>UnitQuaternion</code>
        * [.transform_quat_ip(quat, start_name, end_name)](#module_network..CoordinateNetwork+transform_quat_ip) ⇒ <code>undefined</code>
        * [.transform_vec(vec, start_name, end_name)](#module_network..CoordinateNetwork+transform_vec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.transform_vec_ip(vec, start_name, end_name)](#module_network..CoordinateNetwork+transform_vec_ip) ⇒ <code>undefined</code>

<a name="module_network..CoordinateNetwork"></a>

### network~CoordinateNetwork
A coordinate system network class

Instances of this class function as the graph of the various
coordinate systems (nodes) and transformations between them (edges)

The common workfollow for using this class is to:
   1) Create the instance
   2) Specify all the coordinate system transformations (`.connect_systems(...)`)
   3) Generate the shortest "path" between each system pair (`.compile()`)
   4) Update any transform's dynamic data (`.update(state)`)
   5) Apply transformations to vectors and quaternions
   6) Repeat 4 and 5 as necessary.

```javascript
// 1
const net = new CoordinateNetwork();

// 2
net.connect_systems("A", new transform.ShiftDynamicTransform("A_to_B"), "B");
net.connect_systems("B", new transform.ShiftStaticTransform([1,0,0]), "C" );

// 3
net.compile();

// 4
net.update({ A_to_B: [-1, 0, 0] });

// 5
net.transform_vec([0,0,0], "A", "C"); // returns [0,0,0];

// 6
net.update({ A_to_B: [1, 0, 0] });
net.transform_vec([0,0,0], "A", "C"); // returns [2,0,0];
```

**Kind**: inner class of [<code>network</code>](#module_network)  

* [~CoordinateNetwork](#module_network..CoordinateNetwork)
    * [new CoordinateNetwork()](#new_module_network..CoordinateNetwork_new)
    * [.connect_systems(first, tranform, second, [one_way])](#module_network..CoordinateNetwork+connect_systems) ⇒ <code>this</code>
    * [.compile()](#module_network..CoordinateNetwork+compile) ⇒ <code>this</code>
    * [.update(state)](#module_network..CoordinateNetwork+update) ⇒ <code>this</code>
    * [.transform_quat(quat, start_name, end_name)](#module_network..CoordinateNetwork+transform_quat) ⇒ <code>UnitQuaternion</code>
    * [.transform_quat_ip(quat, start_name, end_name)](#module_network..CoordinateNetwork+transform_quat_ip) ⇒ <code>undefined</code>
    * [.transform_vec(vec, start_name, end_name)](#module_network..CoordinateNetwork+transform_vec) ⇒ <code>Array.&lt;number&gt;</code>
    * [.transform_vec_ip(vec, start_name, end_name)](#module_network..CoordinateNetwork+transform_vec_ip) ⇒ <code>undefined</code>

<a name="new_module_network..CoordinateNetwork_new"></a>

#### new CoordinateNetwork()
Constructor

<a name="module_network..CoordinateNetwork+connect_systems"></a>

#### coordinateNetwork.connect\_systems(first, tranform, second, [one_way]) ⇒ <code>this</code>
Connect two coordinate systems with a transformation

Note, that the names provided to this method `first` and `second`
should be unique, since this method assumes that if it is called
with a particular name twice, it is because that system is connected
to two other systems.

If a provided name doesn't yet coorespond to an existing coordinate
system, it is created.

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>string</code> | the name of the first coordinate system |
| tranform | <code>Tranform</code> | the transformation from coordinate system `first` to coordinate systems `second` |
| second | <code>string</code> | the name of the second coordinate system |
| [one_way] | <code>bool</code> \| <code>undefined</code> | specifies if the transformation is 'one way' (meaning that either `transform.untransform` doesn't exist, or there is some other reason why `second` cannot be back converted into `first`). Default is `undefined` meaning that the transformation is assumed to be two-way. |

<a name="module_network..CoordinateNetwork+compile"></a>

#### coordinateNetwork.compile() ⇒ <code>this</code>
Generate all inter-coordinate-system transformations

This method is intended to be called after all the
various coordinate transformations (edges) are specified,
and it will then recusively discover the shortest path
between every pair of coordinate systems

This should only be called once.

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  
<a name="module_network..CoordinateNetwork+update"></a>

#### coordinateNetwork.update(state) ⇒ <code>this</code>
Update the dynamic data for internal transformations

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | object containing any relevent dynamic data for dynamic transformation objects |

<a name="module_network..CoordinateNetwork+transform_quat"></a>

#### coordinateNetwork.transform\_quat(quat, start_name, end_name) ⇒ <code>UnitQuaternion</code>
Transform an orientation quaternion from `start` to `end`

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  
**Returns**: <code>UnitQuaternion</code> - the orientation quaternion in the transformed
coordinate system.  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the orientation quaternion to transform |
| start_name | <code>string</code> | the name of the coordinate system that `quat` originates within |
| end_name | <code>string</code> | the name of the coordinate system that `quat` should be transformed into |

<a name="module_network..CoordinateNetwork+transform_quat_ip"></a>

#### coordinateNetwork.transform\_quat\_ip(quat, start_name, end_name) ⇒ <code>undefined</code>
Transform an orientation quaternion from `start` to `end` in place

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | the orientation quaternion to transform in place |
| start_name | <code>string</code> | the name of the coordinate system that `quat` originates within |
| end_name | <code>string</code> | the name of the coordinate system that `quat` should be transformed into |

<a name="module_network..CoordinateNetwork+transform_vec"></a>

#### coordinateNetwork.transform\_vec(vec, start_name, end_name) ⇒ <code>Array.&lt;number&gt;</code>
Transform a vector from `start` to `end`

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  
**Returns**: <code>Array.&lt;number&gt;</code> - the 3d vector in the transformed coordinate system  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the 3d vector to transform |
| start_name | <code>string</code> | the name of the coordinate system that `vec` originates within |
| end_name | <code>string</code> | the name of the coordinate system that `vec` should be transformed into |

<a name="module_network..CoordinateNetwork+transform_vec_ip"></a>

#### coordinateNetwork.transform\_vec\_ip(vec, start_name, end_name) ⇒ <code>undefined</code>
Transform a vector from `start` to `end` in place

**Kind**: instance method of [<code>CoordinateNetwork</code>](#module_network..CoordinateNetwork)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the 3d vector to transform in place |
| start_name | <code>string</code> | the name of the coordinate system that `vec` originates within |
| end_name | <code>string</code> | the name of the coordinate system that `vec` should be transformed into |

<a name="module_quaternion"></a>

## quaternion
Quaternion objects for rotation of 3d vectors. This is double cover of SO(3), the special orthogonal
group in 3 dimensions.


* [quaternion](#module_quaternion)
    * [~UnitQuaternion](#module_quaternion..UnitQuaternion)
        * _instance_
            * [.re](#module_quaternion..UnitQuaternion+re) ⇒ <code>number</code>
            * [.i](#module_quaternion..UnitQuaternion+i) ⇒ <code>number</code>
            * [.j](#module_quaternion..UnitQuaternion+j) ⇒ <code>number</code>
            * [.k](#module_quaternion..UnitQuaternion+k) ⇒ <code>number</code>
            * [.qvec](#module_quaternion..UnitQuaternion+qvec) ⇒ <code>Array.&lt;number&gt;</code>
            * [.qvec_inv](#module_quaternion..UnitQuaternion+qvec_inv) ⇒ <code>Array.&lt;number&gt;</code>
            * [.json](#module_quaternion..UnitQuaternion+json) ⇒ <code>Object</code>
            * [.set_vec(qvec)](#module_quaternion..UnitQuaternion+set_vec) ⇒ <code>this</code>
            * [.set_axis(angle, vec)](#module_quaternion..UnitQuaternion+set_axis) ⇒ <code>this</code>
            * [.set_euler(yaw, pitch, roll)](#module_quaternion..UnitQuaternion+set_euler) ⇒ <code>this</code>
            * [.set_as_before(other)](#module_quaternion..UnitQuaternion+set_as_before) ⇒ <code>this</code>
            * [.set_as_after(other)](#module_quaternion..UnitQuaternion+set_as_after) ⇒ <code>this</code>
            * [.set_as_composite(first, second)](#module_quaternion..UnitQuaternion+set_as_composite) ⇒ <code>this</code>
            * [.set_with_reference(other)](#module_quaternion..UnitQuaternion+set_with_reference) ⇒ <code>this</code>
            * [.set_without_reference(other)](#module_quaternion..UnitQuaternion+set_without_reference) ⇒ <code>this</code>
            * [.set_with_coordinate_convention(other)](#module_quaternion..UnitQuaternion+set_with_coordinate_convention) ⇒ <code>this</code>
            * [.set_without_coordinate_convention(other)](#module_quaternion..UnitQuaternion+set_without_coordinate_convention) ⇒ <code>this</code>
            * [.mult(other)](#module_quaternion..UnitQuaternion+mult) ⇒ <code>UnitQuaternion</code>
            * [.after(other)](#module_quaternion..UnitQuaternion+after) ⇒ <code>UnitQuaternion</code>
            * [.before(other)](#module_quaternion..UnitQuaternion+before) ⇒ <code>UnitQuaternion</code>
            * [.with_reference(other)](#module_quaternion..UnitQuaternion+with_reference) ⇒ <code>UnitQuaternion</code>
            * [.without_reference(other)](#module_quaternion..UnitQuaternion+without_reference) ⇒ <code>UnitQuaternion</code>
            * [.with_coordinate_convention(other)](#module_quaternion..UnitQuaternion+with_coordinate_convention) ⇒ <code>UnitQuaternion</code>
            * [.without_coordinate_convention(other)](#module_quaternion..UnitQuaternion+without_coordinate_convention) ⇒ <code>UnitQuaternion</code>
            * [.rotate(vec)](#module_quaternion..UnitQuaternion+rotate) ⇒ <code>Array.&lt;number&gt;</code>
            * [.unrotate(vec)](#module_quaternion..UnitQuaternion+unrotate) ⇒ <code>Array.&lt;number&gt;</code>
            * [.rotate_ip(vec)](#module_quaternion..UnitQuaternion+rotate_ip) ⇒ <code>undefined</code>
            * [.unrotate_ip(vec)](#module_quaternion..UnitQuaternion+unrotate_ip) ⇒ <code>undefined</code>
            * [.toString()](#module_quaternion..UnitQuaternion+toString) ⇒ <code>string</code>
        * _static_
            * [.from_vec(qvec)](#module_quaternion..UnitQuaternion.from_vec) ⇒ <code>UnitQuaternion</code>
            * [.from_axis(angle, vec)](#module_quaternion..UnitQuaternion.from_axis) ⇒ <code>UnitQuaternion</code>
            * [.from_euler(obj)](#module_quaternion..UnitQuaternion.from_euler) ⇒ <code>UnitQuaternion</code>
            * [.from_json(obj)](#module_quaternion..UnitQuaternion.from_json) ⇒ <code>UnitQuaternion</code>
    * [~cap_precision(value, cap)](#module_quaternion..cap_precision) ⇒ <code>string</code>

<a name="module_quaternion..UnitQuaternion"></a>

### quaternion~UnitQuaternion
A quaternion class for rotating 3d vectors

**Kind**: inner class of [<code>quaternion</code>](#module_quaternion)  

* [~UnitQuaternion](#module_quaternion..UnitQuaternion)
    * _instance_
        * [.re](#module_quaternion..UnitQuaternion+re) ⇒ <code>number</code>
        * [.i](#module_quaternion..UnitQuaternion+i) ⇒ <code>number</code>
        * [.j](#module_quaternion..UnitQuaternion+j) ⇒ <code>number</code>
        * [.k](#module_quaternion..UnitQuaternion+k) ⇒ <code>number</code>
        * [.qvec](#module_quaternion..UnitQuaternion+qvec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.qvec_inv](#module_quaternion..UnitQuaternion+qvec_inv) ⇒ <code>Array.&lt;number&gt;</code>
        * [.json](#module_quaternion..UnitQuaternion+json) ⇒ <code>Object</code>
        * [.set_vec(qvec)](#module_quaternion..UnitQuaternion+set_vec) ⇒ <code>this</code>
        * [.set_axis(angle, vec)](#module_quaternion..UnitQuaternion+set_axis) ⇒ <code>this</code>
        * [.set_euler(yaw, pitch, roll)](#module_quaternion..UnitQuaternion+set_euler) ⇒ <code>this</code>
        * [.set_as_before(other)](#module_quaternion..UnitQuaternion+set_as_before) ⇒ <code>this</code>
        * [.set_as_after(other)](#module_quaternion..UnitQuaternion+set_as_after) ⇒ <code>this</code>
        * [.set_as_composite(first, second)](#module_quaternion..UnitQuaternion+set_as_composite) ⇒ <code>this</code>
        * [.set_with_reference(other)](#module_quaternion..UnitQuaternion+set_with_reference) ⇒ <code>this</code>
        * [.set_without_reference(other)](#module_quaternion..UnitQuaternion+set_without_reference) ⇒ <code>this</code>
        * [.set_with_coordinate_convention(other)](#module_quaternion..UnitQuaternion+set_with_coordinate_convention) ⇒ <code>this</code>
        * [.set_without_coordinate_convention(other)](#module_quaternion..UnitQuaternion+set_without_coordinate_convention) ⇒ <code>this</code>
        * [.mult(other)](#module_quaternion..UnitQuaternion+mult) ⇒ <code>UnitQuaternion</code>
        * [.after(other)](#module_quaternion..UnitQuaternion+after) ⇒ <code>UnitQuaternion</code>
        * [.before(other)](#module_quaternion..UnitQuaternion+before) ⇒ <code>UnitQuaternion</code>
        * [.with_reference(other)](#module_quaternion..UnitQuaternion+with_reference) ⇒ <code>UnitQuaternion</code>
        * [.without_reference(other)](#module_quaternion..UnitQuaternion+without_reference) ⇒ <code>UnitQuaternion</code>
        * [.with_coordinate_convention(other)](#module_quaternion..UnitQuaternion+with_coordinate_convention) ⇒ <code>UnitQuaternion</code>
        * [.without_coordinate_convention(other)](#module_quaternion..UnitQuaternion+without_coordinate_convention) ⇒ <code>UnitQuaternion</code>
        * [.rotate(vec)](#module_quaternion..UnitQuaternion+rotate) ⇒ <code>Array.&lt;number&gt;</code>
        * [.unrotate(vec)](#module_quaternion..UnitQuaternion+unrotate) ⇒ <code>Array.&lt;number&gt;</code>
        * [.rotate_ip(vec)](#module_quaternion..UnitQuaternion+rotate_ip) ⇒ <code>undefined</code>
        * [.unrotate_ip(vec)](#module_quaternion..UnitQuaternion+unrotate_ip) ⇒ <code>undefined</code>
        * [.toString()](#module_quaternion..UnitQuaternion+toString) ⇒ <code>string</code>
    * _static_
        * [.from_vec(qvec)](#module_quaternion..UnitQuaternion.from_vec) ⇒ <code>UnitQuaternion</code>
        * [.from_axis(angle, vec)](#module_quaternion..UnitQuaternion.from_axis) ⇒ <code>UnitQuaternion</code>
        * [.from_euler(obj)](#module_quaternion..UnitQuaternion.from_euler) ⇒ <code>UnitQuaternion</code>
        * [.from_json(obj)](#module_quaternion..UnitQuaternion.from_json) ⇒ <code>UnitQuaternion</code>

<a name="module_quaternion..UnitQuaternion+re"></a>

#### unitQuaternion.re ⇒ <code>number</code>
Get real part of quaternion

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+i"></a>

#### unitQuaternion.i ⇒ <code>number</code>
Get i component of quaternion

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+j"></a>

#### unitQuaternion.j ⇒ <code>number</code>
Get j component of quaternion

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+k"></a>

#### unitQuaternion.k ⇒ <code>number</code>
Get k component of quaternion

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+qvec"></a>

#### unitQuaternion.qvec ⇒ <code>Array.&lt;number&gt;</code>
Get vector form of quaternion

Note the convention is `[ re, i, j, k ]`

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+qvec_inv"></a>

#### unitQuaternion.qvec\_inv ⇒ <code>Array.&lt;number&gt;</code>
Get vector form of quaternion inverse

Note the convention is `[ re, i, j, k ]`

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+json"></a>

#### unitQuaternion.json ⇒ <code>Object</code>
Get the json object of this quaternion

Will return an object of the form:
`{ re, i, j, k }`

**Kind**: instance property of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion+set_vec"></a>

#### unitQuaternion.set\_vec(qvec) ⇒ <code>this</code>
Set the quaternion from a vector

Note that the quaternion will be normalized if it is not already.
Also, the convetion is `[ re, i, j, k ]`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| qvec | <code>Array.&lt;number&gt;</code> | the quaternion vector (must be length 4 and nonzero) |

<a name="module_quaternion..UnitQuaternion+set_axis"></a>

#### unitQuaternion.set\_axis(angle, vec) ⇒ <code>this</code>
Set angle and rotational axis

Note that the provided vector will be normalized if it is not already.

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | the angle (in rad) of rotation |
| vec | <code>Array.&lt;number&gt;</code> | the vector to rotate around (must be length 3 and nonzero) |

<a name="module_quaternion..UnitQuaternion+set_euler"></a>

#### unitQuaternion.set\_euler(yaw, pitch, roll) ⇒ <code>this</code>
Set euler angles of rotation

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| yaw | <code>number</code> | rotation around "up" |
| pitch | <code>number</code> | rotation around "right" |
| roll | <code>number</code> | rotation around "forward" |

<a name="module_quaternion..UnitQuaternion+set_as_before"></a>

#### unitQuaternion.set\_as\_before(other) ⇒ <code>this</code>
Mutate this quaternion to be the composite of `this` before `other`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the 'post-applied' rotation |

<a name="module_quaternion..UnitQuaternion+set_as_after"></a>

#### unitQuaternion.set\_as\_after(other) ⇒ <code>this</code>
Mutate this quaternion to be the composite of `this` after `other`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the 'pre-applied' rotation |

<a name="module_quaternion..UnitQuaternion+set_as_composite"></a>

#### unitQuaternion.set\_as\_composite(first, second) ⇒ <code>this</code>
Mutate this quaternion to be the composite of two quaternions

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>UnitQuaternion</code> | the quaternion to apply first in rotation |
| second | <code>UnitQuaternion</code> | the quaternion to apply second in rotation |

<a name="module_quaternion..UnitQuaternion+set_with_reference"></a>

#### unitQuaternion.set\_with\_reference(other) ⇒ <code>this</code>
Mutate this quaternion to be reoriented with respect to another

In this construction, `this` starts out representing the coordinate
transformation from the origin system to a new orientation (A->B). The `other` 
quaternion serves as the transformation from the original coordinate to
an new reference coordinate system (A->A'). This method will mutate `this`
so that it represents the transformation from the new reference to the new
orientation (A'->B).

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the quaternion giving the transform to the new referece |

<a name="module_quaternion..UnitQuaternion+set_without_reference"></a>

#### unitQuaternion.set\_without\_reference(other) ⇒ <code>this</code>
Mutate this quaternion to be oriented without respect to `other`

This is the inverse of `.set_with_reference`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the quaternion giving the old reference |

<a name="module_quaternion..UnitQuaternion+set_with_coordinate_convention"></a>

#### unitQuaternion.set\_with\_coordinate\_convention(other) ⇒ <code>this</code>
Mutate this quaternion to have new coordinate convention

In this construction, `this` starts out representing the
transformation from the origin orientation to a new orientation (A->B), given
a particular coordinate convention (i.e. z=up, x=forward, y=left). `other`
quaternion serves as the transformation from one coordinate convention to another
coordinate convention (i.e. xyz=FLU to x'y'z'=RFU). This method will mutate `this`
so that it represents the same orientation transformation, but utilizing the
new coordinate convention (i.e. A'->B').

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the quaternion giving the transform to the new coordinate convention |

<a name="module_quaternion..UnitQuaternion+set_without_coordinate_convention"></a>

#### unitQuaternion.set\_without\_coordinate\_convention(other) ⇒ <code>this</code>
Mutate this quaternion to remove a coordinate convention

This is the inverse of `.set_with_coordinate_convention`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the quaternion giving the transform to the coordinate convention to remove |

<a name="module_quaternion..UnitQuaternion+mult"></a>

#### unitQuaternion.mult(other) ⇒ <code>UnitQuaternion</code>
Multiply with another quaternion

Note that this is right multiplication, so that `this` is the
multiplier and `other` is the multiplicand.

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the multiplicand |

<a name="module_quaternion..UnitQuaternion+after"></a>

#### unitQuaternion.after(other) ⇒ <code>UnitQuaternion</code>
Compose with another quaternion, `this` after `other`

This returns a quaternion which is equivalent
to first rotating by `other` and second rotating
by `this`.

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - - the composite rotation of `other` then `this`  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the 'pre-applied' rotation |

<a name="module_quaternion..UnitQuaternion+before"></a>

#### unitQuaternion.before(other) ⇒ <code>UnitQuaternion</code>
Compose with another quaternion, `this` before `other`

This returns a quaternion which is equivalent
to first rotating by `this` and second rotating
by `other`.

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - - the composite rotation of `this` then `other`  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the 'post-applied' rotation |

<a name="module_quaternion..UnitQuaternion+with_reference"></a>

#### unitQuaternion.with\_reference(other) ⇒ <code>UnitQuaternion</code>
Create the quaterion which is `this` referenced against `other`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - The transformation of `this` referenced against `other`  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the new reference point |

<a name="module_quaternion..UnitQuaternion+without_reference"></a>

#### unitQuaternion.without\_reference(other) ⇒ <code>UnitQuaternion</code>
Create the quaterion which is `this` dereferenced against `other`

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - The transformation of `this` dereferenced against `other`  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the reference point to dereference |

<a name="module_quaternion..UnitQuaternion+with_coordinate_convention"></a>

#### unitQuaternion.with\_coordinate\_convention(other) ⇒ <code>UnitQuaternion</code>
Create the quaternion which is `this` with new coordinate convetion

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - The new convention quaternion  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the coordinate convetion transformation |

<a name="module_quaternion..UnitQuaternion+without_coordinate_convention"></a>

#### unitQuaternion.without\_coordinate\_convention(other) ⇒ <code>UnitQuaternion</code>
Create the quaternion which is `this` with dereferencing a coordinate convetion

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - The old convention quaternion  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the coordinate convetion transformation to remove |

<a name="module_quaternion..UnitQuaternion+rotate"></a>

#### unitQuaternion.rotate(vec) ⇒ <code>Array.&lt;number&gt;</code>
Rotate a 3d vector with this quaternion

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>Array.&lt;number&gt;</code> - - the rotated vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to rotate (must be length 3) |

<a name="module_quaternion..UnitQuaternion+unrotate"></a>

#### unitQuaternion.unrotate(vec) ⇒ <code>Array.&lt;number&gt;</code>
Undoes a rotation of a 3d vector with this quaterion

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>Array.&lt;number&gt;</code> - - the unrotated vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to unrotate (must be length 3) |

<a name="module_quaternion..UnitQuaternion+rotate_ip"></a>

#### unitQuaternion.rotate\_ip(vec) ⇒ <code>undefined</code>
Rotate a 3d vector with this quaternion in place

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to rotate in place (must be length 3) |

<a name="module_quaternion..UnitQuaternion+unrotate_ip"></a>

#### unitQuaternion.unrotate\_ip(vec) ⇒ <code>undefined</code>
Undoes a rotation of a 3d vector with this quaternion in place

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to unrotate in place (must be length 3) |

<a name="module_quaternion..UnitQuaternion+toString"></a>

#### unitQuaternion.toString() ⇒ <code>string</code>
Get an approximate string representation

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
<a name="module_quaternion..UnitQuaternion.from_vec"></a>

#### UnitQuaternion.from\_vec(qvec) ⇒ <code>UnitQuaternion</code>
Construct quaternion from a 4d vector

Note, the quaternion is normalized if not already. And the
convention is `[ re, i, j, k ]`.

**Kind**: static method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| qvec | <code>Array.&lt;number&gt;</code> | the vector to construct with (must be length 4 and nonzero) |

<a name="module_quaternion..UnitQuaternion.from_axis"></a>

#### UnitQuaternion.from\_axis(angle, vec) ⇒ <code>UnitQuaternion</code>
Construct quaternion from an angle and rotational axis

Note, the rotational axis is normalized if not already

**Kind**: static method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | the rotational angle (in radians) |
| vec | <code>Array.&lt;number&gt;</code> | the vector to rotate around (must be length 3 and nonzero) |

<a name="module_quaternion..UnitQuaternion.from_euler"></a>

#### UnitQuaternion.from\_euler(obj) ⇒ <code>UnitQuaternion</code>
Constrcut quaterion from euler angles

TODO : explain sign convention

**Kind**: static method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | object containing euler angles |
| [obj.yaw] | <code>number</code> | <code>0.0</code> | rotation around "up" |
| [obj.pitch] | <code>number</code> | <code>0.0</code> | rotation around "right" |
| [obj.roll] | <code>number</code> | <code>0.0</code> | rotation around "forward" |

<a name="module_quaternion..UnitQuaternion.from_json"></a>

#### UnitQuaternion.from\_json(obj) ⇒ <code>UnitQuaternion</code>
Construct quaterion from json object

Note, the quaternion will be normalized if not already. At
least one of the configuration parameters (`re, i, j, k`)
must be given, otherwise the constructor will fail

**Kind**: static method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | the json object |
| [obj.re] | <code>number</code> | <code>0.0</code> | the real part |
| [obj.i] | <code>number</code> | <code>0.0</code> | the i component |
| [obj.j] | <code>number</code> | <code>0.0</code> | the j component |
| [obj.k] | <code>number</code> | <code>0.0</code> | the k component |

<a name="module_quaternion..cap_precision"></a>

### quaternion~cap\_precision(value, cap) ⇒ <code>string</code>
Cap a number at a certain precision

**Kind**: inner method of [<code>quaternion</code>](#module_quaternion)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | number to cap |
| cap | <code>number</code> | maximum number of decimal places |

<a name="module_shift"></a>

## shift
Shift objects for shifting 3d vectors. This is single cover of T(3), the translation group in 3 dimensions.


* [shift](#module_shift)
    * [~Shift](#module_shift..Shift)
        * _instance_
            * [.vec](#module_shift..Shift+vec) ⇒ <code>Array.&lt;number&gt;</code>
            * [.set_vec(vec)](#module_shift..Shift+set_vec) ⇒ <code>this</code>
            * [.set_as_composite(first, second)](#module_shift..Shift+set_as_composite) ⇒ <code>this</code>
            * [.add(other)](#module_shift..Shift+add) ⇒ <code>Shift</code>
            * [.after(other)](#module_shift..Shift+after) ⇒ <code>Shift</code>
            * [.shift(vec)](#module_shift..Shift+shift) ⇒ <code>Array.&lt;number&gt;</code>
            * [.shift_ip(vec)](#module_shift..Shift+shift_ip) ⇒ <code>undefined</code>
            * [.unshift(vec)](#module_shift..Shift+unshift) ⇒ <code>Array.&lt;number&gt;</code>
            * [.unshift_ip(vec)](#module_shift..Shift+unshift_ip) ⇒ <code>undefined</code>
        * _static_
            * [.from_vec(vec)](#module_shift..Shift.from_vec) ⇒ <code>Shift</code>

<a name="module_shift..Shift"></a>

### shift~Shift
A shift object for shifting 3d vectors

**Kind**: inner class of [<code>shift</code>](#module_shift)  

* [~Shift](#module_shift..Shift)
    * _instance_
        * [.vec](#module_shift..Shift+vec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.set_vec(vec)](#module_shift..Shift+set_vec) ⇒ <code>this</code>
        * [.set_as_composite(first, second)](#module_shift..Shift+set_as_composite) ⇒ <code>this</code>
        * [.add(other)](#module_shift..Shift+add) ⇒ <code>Shift</code>
        * [.after(other)](#module_shift..Shift+after) ⇒ <code>Shift</code>
        * [.shift(vec)](#module_shift..Shift+shift) ⇒ <code>Array.&lt;number&gt;</code>
        * [.shift_ip(vec)](#module_shift..Shift+shift_ip) ⇒ <code>undefined</code>
        * [.unshift(vec)](#module_shift..Shift+unshift) ⇒ <code>Array.&lt;number&gt;</code>
        * [.unshift_ip(vec)](#module_shift..Shift+unshift_ip) ⇒ <code>undefined</code>
    * _static_
        * [.from_vec(vec)](#module_shift..Shift.from_vec) ⇒ <code>Shift</code>

<a name="module_shift..Shift+vec"></a>

#### shift.vec ⇒ <code>Array.&lt;number&gt;</code>
Get the shift vector

**Kind**: instance property of [<code>Shift</code>](#module_shift..Shift)  
<a name="module_shift..Shift+set_vec"></a>

#### shift.set\_vec(vec) ⇒ <code>this</code>
Set the shift vector

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | vector to shift with (must be length 3) |

<a name="module_shift..Shift+set_as_composite"></a>

#### shift.set\_as\_composite(first, second) ⇒ <code>this</code>
Mutate this shift to be the composite of two shifts

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>Shift</code> | the shift to apply first |
| second | <code>Shift</code> | the shift to apply second |

<a name="module_shift..Shift+add"></a>

#### shift.add(other) ⇒ <code>Shift</code>
Add this shift with another shift

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  
**Returns**: <code>Shift</code> - the resultant composite shift  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Shift</code> | the other shift to compose with |

<a name="module_shift..Shift+after"></a>

#### shift.after(other) ⇒ <code>Shift</code>
Alias for `.add`

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  
**Returns**: <code>Shift</code> - the resultant composite shift  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Shift</code> | the other shift to compose with |

<a name="module_shift..Shift+shift"></a>

#### shift.shift(vec) ⇒ <code>Array.&lt;number&gt;</code>
Shift a 3d vector

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  
**Returns**: <code>Array.&lt;number&gt;</code> - the shifted vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to shift (must be length 3) |

<a name="module_shift..Shift+shift_ip"></a>

#### shift.shift\_ip(vec) ⇒ <code>undefined</code>
Shift a 3d vector in place

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to shift in place (must be length 3) |

<a name="module_shift..Shift+unshift"></a>

#### shift.unshift(vec) ⇒ <code>Array.&lt;number&gt;</code>
Undo the shift of a 3d vector

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  
**Returns**: <code>Array.&lt;number&gt;</code> - the unshifted vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to unshift (must be length 3) |

<a name="module_shift..Shift+unshift_ip"></a>

#### shift.unshift\_ip(vec) ⇒ <code>undefined</code>
Undo the shift of a 3d vector in place

**Kind**: instance method of [<code>Shift</code>](#module_shift..Shift)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to unshift (must be length 3) |

<a name="module_shift..Shift.from_vec"></a>

#### Shift.from\_vec(vec) ⇒ <code>Shift</code>
Construct a shift from a vector

**Kind**: static method of [<code>Shift</code>](#module_shift..Shift)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | vector to shift with (must be length 3) |

<a name="module_transform"></a>

## transform
Transformation objects for coordinate transformations of 3d vectors


* [transform](#module_transform)
    * [~Transform](#module_transform..Transform)
        * [.update(state)](#module_transform..Transform+update) ⇒ <code>this</code>
        * [.transform_vec(vec)](#module_transform..Transform+transform_vec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.untransform_vec(vec)](#module_transform..Transform+untransform_vec) ⇒ <code>Array.&lt;number&gt;</code>
        * [.transform_vec_ip(vec)](#module_transform..Transform+transform_vec_ip) ⇒ <code>undefined</code>
        * [.untransform_vec_ip(vec)](#module_transform..Transform+untransform_vec_ip) ⇒ <code>undefined</code>
        * [.transform_quat(quat)](#module_transform..Transform+transform_quat) ⇒ <code>UnitQuaternion</code>
        * [.untransform_quat(quat)](#module_transform..Transform+untransform_quat) ⇒ <code>UnitQuaternion</code>
        * [.transform_quat_ip(quat)](#module_transform..Transform+transform_quat_ip) ⇒ <code>undefined</code>
        * [.untransform_quat_ip(quat)](#module_transform..Transform+untransform_quat_ip) ⇒ <code>undefined</code>
    * [~EuclideanReverseStaticTransform](#module_transform..EuclideanReverseStaticTransform)
        * [new EuclideanReverseStaticTransform(qvec, vec)](#new_module_transform..EuclideanReverseStaticTransform_new)
    * [~EuclideanStaticTransform](#module_transform..EuclideanStaticTransform)
        * [new EuclideanStaticTransform(qvec, vec)](#new_module_transform..EuclideanStaticTransform_new)
    * [~ShiftDynamicTransform](#module_transform..ShiftDynamicTransform)
        * [new ShiftDynamicTransform(data_key)](#new_module_transform..ShiftDynamicTransform_new)
    * [~ShiftStaticTransform](#module_transform..ShiftStaticTransform)
        * [new ShiftStaticTransform(vec)](#new_module_transform..ShiftStaticTransform_new)
    * [~RotateDynamicTransform](#module_transform..RotateDynamicTransform)
        * [new RotateDynamicTransform(data_key, setter_name)](#new_module_transform..RotateDynamicTransform_new)
    * [~RotateStaticTransform](#module_transform..RotateStaticTransform)
        * [new RotateStaticTransform(vec_or_obj_or_angle, axis_or_null)](#new_module_transform..RotateStaticTransform_new)
    * [~EuclideanCompositeTransform](#module_transform..EuclideanCompositeTransform)
        * [new EuclideanCompositeTransform(first, second)](#new_module_transform..EuclideanCompositeTransform_new)
    * [~CompositeTransform](#module_transform..CompositeTransform)
        * [new CompositeTransform(first, second)](#new_module_transform..CompositeTransform_new)
    * [~PinholeCameraTransform](#module_transform..PinholeCameraTransform)
        * [.contructor(Q_key)](#module_transform..PinholeCameraTransform+contructor)
    * [~EuclideanReverseTransformMixin()](#module_transform..EuclideanReverseTransformMixin)
    * [~EuclideanTransformMixin()](#module_transform..EuclideanTransformMixin)
    * [~CompositeTransformMixin()](#module_transform..CompositeTransformMixin)

<a name="module_transform..Transform"></a>

### transform~Transform
Abstract base class for cooridnate transformations

This is the class which can be inhereted from the generate
transformations used by `CoordinteNetwork`s to transform
between coordinate systems

An instance of this class represents the identity tranformation,
in that it will always return the same vec/quaternion, regardless
of any other method calls

**Kind**: inner class of [<code>transform</code>](#module_transform)  

* [~Transform](#module_transform..Transform)
    * [.update(state)](#module_transform..Transform+update) ⇒ <code>this</code>
    * [.transform_vec(vec)](#module_transform..Transform+transform_vec) ⇒ <code>Array.&lt;number&gt;</code>
    * [.untransform_vec(vec)](#module_transform..Transform+untransform_vec) ⇒ <code>Array.&lt;number&gt;</code>
    * [.transform_vec_ip(vec)](#module_transform..Transform+transform_vec_ip) ⇒ <code>undefined</code>
    * [.untransform_vec_ip(vec)](#module_transform..Transform+untransform_vec_ip) ⇒ <code>undefined</code>
    * [.transform_quat(quat)](#module_transform..Transform+transform_quat) ⇒ <code>UnitQuaternion</code>
    * [.untransform_quat(quat)](#module_transform..Transform+untransform_quat) ⇒ <code>UnitQuaternion</code>
    * [.transform_quat_ip(quat)](#module_transform..Transform+transform_quat_ip) ⇒ <code>undefined</code>
    * [.untransform_quat_ip(quat)](#module_transform..Transform+untransform_quat_ip) ⇒ <code>undefined</code>

<a name="module_transform..Transform+update"></a>

#### transform.update(state) ⇒ <code>this</code>
Update any dynamic data

Some transformations are 'dynamic' meaning that
their actual tranformation is contingent upon
data not provided at instantiation time. This
is the method to be able to provide that data
later on. The common convention is for dynamic
transformations to be instantiated with a 'key'
string, for which `state[key]` will yeild the
correct data for updating.

For non-dynamic transformation, this method is a
noop.

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | a data state, containing dynamic data |

<a name="module_transform..Transform+transform_vec"></a>

#### transform.transform\_vec(vec) ⇒ <code>Array.&lt;number&gt;</code>
Transform a vector

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  
**Returns**: <code>Array.&lt;number&gt;</code> - the transformed vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to transform |

<a name="module_transform..Transform+untransform_vec"></a>

#### transform.untransform\_vec(vec) ⇒ <code>Array.&lt;number&gt;</code>
Undo a vector transform

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  
**Returns**: <code>Array.&lt;number&gt;</code> - the untransformed vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to untransform |

<a name="module_transform..Transform+transform_vec_ip"></a>

#### transform.transform\_vec\_ip(vec) ⇒ <code>undefined</code>
Transform a vector in place

Note, the provided vector is mutated by this method.

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to transform in place |

<a name="module_transform..Transform+untransform_vec_ip"></a>

#### transform.untransform\_vec\_ip(vec) ⇒ <code>undefined</code>
Undo a vector transform in place

Note, the provided vector is mutated by this method.

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | a 3d vector to untransform in place |

<a name="module_transform..Transform+transform_quat"></a>

#### transform.transform\_quat(quat) ⇒ <code>UnitQuaternion</code>
Transform an orientation quaternion

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  
**Returns**: <code>UnitQuaternion</code> - the transformed orientation quaternion  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | an orientation quaternion to transform |

<a name="module_transform..Transform+untransform_quat"></a>

#### transform.untransform\_quat(quat) ⇒ <code>UnitQuaternion</code>
Undo a transform of an orientation quaternion

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  
**Returns**: <code>UnitQuaternion</code> - the untransformed orientation quaternion  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | an orientation quaternion to untransform |

<a name="module_transform..Transform+transform_quat_ip"></a>

#### transform.transform\_quat\_ip(quat) ⇒ <code>undefined</code>
Transform an orientation quaternion in place

Note, the provided quaternion is mutated by this method.

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | an orientation quaternion to transform |

<a name="module_transform..Transform+untransform_quat_ip"></a>

#### transform.untransform\_quat\_ip(quat) ⇒ <code>undefined</code>
Undo a transform of an orientation quaternion in place

Note, the provided quaternion is mutated by this method.

**Kind**: instance method of [<code>Transform</code>](#module_transform..Transform)  

| Param | Type | Description |
| --- | --- | --- |
| quat | <code>UnitQuaternion</code> | an orientation quaternion to untransform in place |

<a name="module_transform..EuclideanReverseStaticTransform"></a>

### transform~EuclideanReverseStaticTransform
A static Reverse Euclidean Transform class

This class allows for a reverse euclidean transformation of coordinate
systems, which the rotation and shift known at the time of instantiation.

See `euclidean.EuclideanReverse` for more details

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..EuclideanReverseStaticTransform_new"></a>

#### new EuclideanReverseStaticTransform(qvec, vec)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| qvec | <code>Array.&lt;number&gt;</code> | the quaternion vector for rotation `[re, i, j, k]` |
| vec | <code>Array.&lt;number&gt;</code> | the shift vector `[ x, y, z ]` |

<a name="module_transform..EuclideanStaticTransform"></a>

### transform~EuclideanStaticTransform
A static Euclidean Transform class

This class allows for a euclidean transformation of coordinate
systems, which the rotation and shift known at the time of instantiation.

See `euclidean.Euclidean` for more details

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..EuclideanStaticTransform_new"></a>

#### new EuclideanStaticTransform(qvec, vec)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| qvec | <code>Array.&lt;number&gt;</code> | the quaternion vector for rotation `[re, i, j, k]` |
| vec | <code>Array.&lt;number&gt;</code> | the shift vector `[ x, y, z ]` |

<a name="module_transform..ShiftDynamicTransform"></a>

### transform~ShiftDynamicTransform
A dynamic shift (translation) transformation class

These classes form a single cover of T(3), and are dynamic in the sense
that the actual shift which is applied is not provided at the time of
instantiation, but rather provided with the method `this.update`.

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..ShiftDynamicTransform_new"></a>

#### new ShiftDynamicTransform(data_key)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| data_key | <code>string</code> | the key for which `state[key]` gives the shift, where `state` is provided later to `this.update(state)` |

<a name="module_transform..ShiftStaticTransform"></a>

### transform~ShiftStaticTransform
A shift (translation) transformation class

These classes form a single cover of T(3).

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..ShiftStaticTransform_new"></a>

#### new ShiftStaticTransform(vec)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the 3d vector shift of this transformation |

<a name="module_transform..RotateDynamicTransform"></a>

### transform~RotateDynamicTransform
A dynamic rotation transformation class

These classes form a double cover of SO(3), and are dynamic in the sense
that the actual rotation which is applied is not provided at the time of
instantiation, but rather provided with the method `this.update`.

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..RotateDynamicTransform_new"></a>

#### new RotateDynamicTransform(data_key, setter_name)
Constructor

There are several methods of providing the rotation, specified by `setter_name`:
 1) "set_axis" where an angle and rotational axis are provided. In this case,
 the `data_key` should be a list: `["key_for_angle", "key_for_rotation_axis"]`
 2) "set_vec" where a quaterion qvec `[re, i, j, k]` are provided. In this case,
 the `data_key` should be a string `"key_for_qvec"`.
 3) "set_euler" where a yaw, pitch and roll are provided. In this case, the 
 `data_key` should be an object: `{ yaw: "key_for_yaw", pitch: "key_for_pitch",
 roll: "key_for_roll" }`. Note any (but not all) of the keys can be `undefined`


| Param | Type | Description |
| --- | --- | --- |
| data_key | <code>string</code> \| <code>list</code> \| <code>Object</code> | keys for dynamic data given to `this.update(state)` |
| setter_name | <code>string</code> | type of setting method, should be "set_axis", "set_vec" or "set_euler" |

<a name="module_transform..RotateStaticTransform"></a>

### transform~RotateStaticTransform
A rotation transformation class

These classes form a double cover of SO(3).

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..RotateStaticTransform_new"></a>

#### new RotateStaticTransform(vec_or_obj_or_angle, axis_or_null)
Constructor

There are several ways to instantiate this class
 1) Setting an angle and axis of the rotation. In this case, `vec_or_obj_or_angle`
 be the angle of the rotation (in rad), and `axis_or_null` should be the rotational axis.
 2) Setting a quaternion qvec. In this case, `vec_or_obj_or_angle`
 be the quaternion vector `[re, i, j, k]`, and `axis_or_null` should be `undefined`.
 3) Setting the euler angles. In this case, `vec_or_obj_or_angle`
 be an object: `{ yaw, pitch, roll }`, and `axis_or_null` should be `undefined`.


| Param | Type |
| --- | --- |
| vec_or_obj_or_angle | <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>number</code> | 
| axis_or_null | <code>Array.&lt;number&gt;</code> \| <code>undefined</code> | 

<a name="module_transform..EuclideanCompositeTransform"></a>

### transform~EuclideanCompositeTransform
A composite transformation class for Euclidean-type transformations

This class is the composite of two other Euclidean-type transformations 
given to the constructor as `first` and `second`

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..EuclideanCompositeTransform_new"></a>

#### new EuclideanCompositeTransform(first, second)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| first | <code>EuclideanTransform</code> | the first transformation to be applied in the composite |
| second | <code>EuclideanTransform</code> | the second transformation to be applied in the composite |

<a name="module_transform..CompositeTransform"></a>

### transform~CompositeTransform
A composite transformation class

This class is the composite of two other transformations given to the constructor as `first` and `second`

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="new_module_transform..CompositeTransform_new"></a>

#### new CompositeTransform(first, second)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| first | <code>Transform</code> | the first transformation to be applied in the composite |
| second | <code>Transform</code> | the second transformation to be applied in the composite |

<a name="module_transform..PinholeCameraTransform"></a>

### transform~PinholeCameraTransform
A pinhole camera transformation calss

This class handles imaging vectors using a pinhole
model for a pair of stereorectified cameras. This class
follows the conventions of [OpenCV](https://docs.opencv.org/) and users are refered
there for details.

This class is also 'dynamic' in the sense that the Q-matrix of the transformation
is not provided at instatiation, but later via `this.update(state)`.

**Kind**: inner class of [<code>transform</code>](#module_transform)  
<a name="module_transform..PinholeCameraTransform+contructor"></a>

#### pinholeCameraTransform.contructor(Q_key)
Constructor

**Kind**: instance method of [<code>PinholeCameraTransform</code>](#module_transform..PinholeCameraTransform)  

| Param | Type | Description |
| --- | --- | --- |
| Q_key | <code>string</code> | the key of the Q matrix, accessed as `state[Q_key]` in `this.update(state)` |

<a name="module_transform..EuclideanReverseTransformMixin"></a>

### transform~EuclideanReverseTransformMixin()
A class mixin for Reverse Euclidean-type transformations

This mixin does several things to the base classes it acts on:
   1) It creates an instance of `EuclideanReverse` attached to this class
   instance as `this.euclidean`
   2) It updates all the `this.transform...` methods to reference the 
   internal Euclidean vector and quaternion operations.

This intent is for subclasses that inherit from this to override either the
constructor and modify `this.euclidean` at instantiation (e.g. `EuclideanReverseStaticTransform`)
or to override the `this.update` method to modify `this.euclidean` with some
dynamic data (e.g. `ShiftDynamicTransform`).

Use like: `class NewTranform extends EuclideanReverseTransformMixin(Base) {}`

**Kind**: inner method of [<code>transform</code>](#module_transform)  
<a name="module_transform..EuclideanTransformMixin"></a>

### transform~EuclideanTransformMixin()
A class mixin for Euclidean-type transformations

This mixin does several things to the base classes it acts on:
   1) It creates an instance of `Euclidean` attached to this class
   instance as `this.euclidean`
   2) It updates all the `this.transform...` methods to reference the 
   internal Euclidean vector and quaternion operations.

This intent is for subclasses that inherit from this to override either the
constructor and modify `this.euclidean` at instantiation (e.g. `EuclideanStaticTransform`)
or to override the `this.update` method to modify `this.euclidean` with some
dynamic data (e.g. `ShiftDynamicTransform`).

Use like: `class NewTranform extends EuclideanTransformMixin(Base) {}`

**Kind**: inner method of [<code>transform</code>](#module_transform)  
<a name="module_transform..CompositeTransformMixin"></a>

### transform~CompositeTransformMixin()
A class mixin for composite transformations

This mixin is intended to help define transformations which are the composite of two
other transformations `first` and `second`.

This mixin does several things to the base classes it acts on:
   1) It modifies the constructor to expect two positional arguments: `first` and 
   `second`, the two transformations which this is the composite of.
   2) It modifies the `this.update` method to call update on `first` and `second`.

This intent is for subclasses that inherit from this to override all the `this.transform...`
methods to define how `first` and `second` interact with the vec/quaternions to produce
the total transformation. See `CompositeTransform` for a simple example. Note that this
mixin does NOT change any of these methods by default, since it could be mixed in with
other base classes which might already have those methods defined in special ways. See
`EuclideanCompositeTransform` as an example, since it also inherits from other classes.

Use like: `class NewTranform extends CompositeTransformMixin(Base) {}`

**Kind**: inner method of [<code>transform</code>](#module_transform)  
