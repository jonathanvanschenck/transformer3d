<a name="module_quaternion"></a>

## quaternion
Quaternion objects for rotation of 3d vectors


* [quaternion](#module_quaternion)
    * [~UnitQuaternion](#module_quaternion..UnitQuaternion)
        * _instance_
            * [.re](#module_quaternion..UnitQuaternion+re) ⇒ <code>number</code>
            * [.i](#module_quaternion..UnitQuaternion+i) ⇒ <code>number</code>
            * [.j](#module_quaternion..UnitQuaternion+j) ⇒ <code>number</code>
            * [.k](#module_quaternion..UnitQuaternion+k) ⇒ <code>number</code>
            * [.qvec](#module_quaternion..UnitQuaternion+qvec) ⇒ <code>Array.&lt;number&gt;</code>
            * [.set_vec(qvec)](#module_quaternion..UnitQuaternion+set_vec) ⇒ <code>this</code>
            * [.set_axis(angle, vec)](#module_quaternion..UnitQuaternion+set_axis) ⇒ <code>this</code>
            * [.set_euler(yaw, pitch, roll)](#module_quaternion..UnitQuaternion+set_euler) ⇒ <code>this</code>
            * [.set_as_composite(first, second)](#module_quaternion..UnitQuaternion+set_as_composite) ⇒ <code>this</code>
            * [.mult(other)](#module_quaternion..UnitQuaternion+mult) ⇒ <code>UnitQuaternion</code>
            * [.then(other)](#module_quaternion..UnitQuaternion+then) ⇒ <code>UnitQuaternion</code>
            * [.rotate(vec)](#module_quaternion..UnitQuaternion+rotate) ⇒ <code>Array.&lt;number&gt;</code>
            * [.rotate_ip(vec)](#module_quaternion..UnitQuaternion+rotate_ip) ⇒ <code>undefined</code>
        * _static_
            * [.from_vec(qvec)](#module_quaternion..UnitQuaternion.from_vec) ⇒ <code>UnitQuaternion</code>
            * [.from_axis(angle, vec)](#module_quaternion..UnitQuaternion.from_axis) ⇒ <code>UnitQuaternion</code>
            * [.from_euler(obj)](#module_quaternion..UnitQuaternion.from_euler) ⇒ <code>UnitQuaternion</code>
    * [~quat_mult(a, b, c)](#module_quaternion..quat_mult) ⇒ <code>undefined</code>
    * [~quat_wrap(q, v_out, v_in, c)](#module_quaternion..quat_wrap) ⇒ <code>undefined</code>
    * [~quat_wrap_ip(q, v, c)](#module_quaternion..quat_wrap_ip) ⇒ <code>undefined</code>

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
        * [.set_vec(qvec)](#module_quaternion..UnitQuaternion+set_vec) ⇒ <code>this</code>
        * [.set_axis(angle, vec)](#module_quaternion..UnitQuaternion+set_axis) ⇒ <code>this</code>
        * [.set_euler(yaw, pitch, roll)](#module_quaternion..UnitQuaternion+set_euler) ⇒ <code>this</code>
        * [.set_as_composite(first, second)](#module_quaternion..UnitQuaternion+set_as_composite) ⇒ <code>this</code>
        * [.mult(other)](#module_quaternion..UnitQuaternion+mult) ⇒ <code>UnitQuaternion</code>
        * [.then(other)](#module_quaternion..UnitQuaternion+then) ⇒ <code>UnitQuaternion</code>
        * [.rotate(vec)](#module_quaternion..UnitQuaternion+rotate) ⇒ <code>Array.&lt;number&gt;</code>
        * [.rotate_ip(vec)](#module_quaternion..UnitQuaternion+rotate_ip) ⇒ <code>undefined</code>
    * _static_
        * [.from_vec(qvec)](#module_quaternion..UnitQuaternion.from_vec) ⇒ <code>UnitQuaternion</code>
        * [.from_axis(angle, vec)](#module_quaternion..UnitQuaternion.from_axis) ⇒ <code>UnitQuaternion</code>
        * [.from_euler(obj)](#module_quaternion..UnitQuaternion.from_euler) ⇒ <code>UnitQuaternion</code>

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

<a name="module_quaternion..UnitQuaternion+set_as_composite"></a>

#### unitQuaternion.set\_as\_composite(first, second) ⇒ <code>this</code>
Mutate this quaternion to be the composite of two quaternions

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>UnitQuaternion</code> | the quaternion to apply first in rotation |
| second | <code>UnitQuaternion</code> | the quaternion to apply second in rotation |

<a name="module_quaternion..UnitQuaternion+mult"></a>

#### unitQuaternion.mult(other) ⇒ <code>UnitQuaternion</code>
Multiply with another quaternion

Note that this is right multiplication, so that `this` is the
multiplier and `other` is the multiplicand.

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the multiplicand |

<a name="module_quaternion..UnitQuaternion+then"></a>

#### unitQuaternion.then(other) ⇒ <code>UnitQuaternion</code>
Compose with another quaternion

This returns a quaternion which is equivalent
to first rotating by `this` and second rotating
by `other`.

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>UnitQuaternion</code> - - the composite rotation  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>UnitQuaternion</code> | the second rotation to apply |

<a name="module_quaternion..UnitQuaternion+rotate"></a>

#### unitQuaternion.rotate(vec) ⇒ <code>Array.&lt;number&gt;</code>
Rotate a 3d vector with this quaternion

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  
**Returns**: <code>Array.&lt;number&gt;</code> - - the rotated vector  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to rotate (must be length 3) |

<a name="module_quaternion..UnitQuaternion+rotate_ip"></a>

#### unitQuaternion.rotate\_ip(vec) ⇒ <code>undefined</code>
Rotate a 3d vector with this quaternion in place

**Kind**: instance method of [<code>UnitQuaternion</code>](#module_quaternion..UnitQuaternion)  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Array.&lt;number&gt;</code> | the vector to rotate in place (must be length 3) |

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

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object containing euler angles |
| obj.yaw | <code>number</code> | rotation around "up" |
| obj.pitch | <code>number</code> | rotation around "right" |
| obj.roll | <code>number</code> | rotation around "forward" |

<a name="module_quaternion..quat_mult"></a>

### quaternion~quat\_mult(a, b, c) ⇒ <code>undefined</code>
Apply quaternion multipliction

Note, this function will write into `c` the result of `a*b`. The 
convention is `[ re, i, j, k ]`.

**Kind**: inner method of [<code>quaternion</code>](#module_quaternion)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array.&lt;number&gt;</code> | quaternion vector multiplier (must be length 4) |
| b | <code>Array.&lt;number&gt;</code> | quaternion vector multiplicand (must be length 4) |
| c | <code>Array.&lt;number&gt;</code> | quaternion vector product (must be length 4) |

<a name="module_quaternion..quat_wrap"></a>

### quaternion~quat\_wrap(q, v_out, v_in, c) ⇒ <code>undefined</code>
Apply a quaternion rotation to a vector

Note that both `v_out` and `c` are mutated by this fuction. This
function writes into `v_out` the result of `q^-1 * [0,v_in] * q`.
The conventions are `[ re, i, j, k]` for quaternion vectors 
and `[ x, y, z ]` for 3d vectors

**Kind**: inner method of [<code>quaternion</code>](#module_quaternion)  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>Array.&lt;number&gt;</code> | unit quaterion to rotate with (must be length 4, and normalized) |
| v_out | <code>Array.&lt;number&gt;</code> | 3d vector to rotate (must be length 3) |
| v_in | <code>Array.&lt;number&gt;</code> | rotated 3d vector (must be length 3) |
| c | <code>Array.&lt;number&gt;</code> | working space for operation (must be length 4) |

<a name="module_quaternion..quat_wrap_ip"></a>

### quaternion~quat\_wrap\_ip(q, v, c) ⇒ <code>undefined</code>
Apply a quaternion rotation to a vector in place

Note that both `v` and `c` are mutated by this fuction. This
function writes into `v` the result of `q^-1 * [0,v] * q`.
The conventions are `[ re, i, j, k]` for quaternion vectors 
and `[ x, y, z ]` for 3d vectors

**Kind**: inner method of [<code>quaternion</code>](#module_quaternion)  

| Param | Type | Description |
| --- | --- | --- |
| q | <code>Array.&lt;number&gt;</code> | unit quaterion to rotate with (must be length 4) |
| v | <code>Array.&lt;number&gt;</code> | 3d vector to rotate in place (must be length 3) |
| c | <code>Array.&lt;number&gt;</code> | working space for operation (must be length 4) |

