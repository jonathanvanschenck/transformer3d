## Modules

<dl>
<dt><a href="#module_euclidean">euclidean</a></dt>
<dd><p>Euclidean objects for roto-translations of 3d vectors. This is a double cover of of SE(3), the
special Euclidean group in 3 dimensions.</p>
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
Euclidean objects for roto-translations of 3d vectors. This is a double cover of of SE(3), the
special Euclidean group in 3 dimensions.


* [euclidean](#module_euclidean)
    * [~Euclidean](#module_euclidean..Euclidean)
        * [.translation](#module_euclidean..Euclidean+translation) ⇒ <code>Array.&lt;number&gt;</code>
    * [~EuclideanReverse](#module_euclidean..EuclideanReverse)
        * [.translation](#module_euclidean..EuclideanReverse+translation) ⇒ <code>Array.&lt;number&gt;</code>

<a name="module_euclidean..Euclidean"></a>

### euclidean~Euclidean
Euclidean (roto-translation) objects for 3d vectors

Note, this rotates first, then shifts

**Kind**: inner class of [<code>euclidean</code>](#module_euclidean)  
<a name="module_euclidean..Euclidean+translation"></a>

#### euclidean.translation ⇒ <code>Array.&lt;number&gt;</code>
Get the effective shift post rotation

**Kind**: instance property of [<code>Euclidean</code>](#module_euclidean..Euclidean)  
**Returns**: <code>Array.&lt;number&gt;</code> - 3d vector of shift  
<a name="module_euclidean..EuclideanReverse"></a>

### euclidean~EuclideanReverse
Reverse Euclidean (roto-translation) objects for 3d vectors

Note, this shifts first then rotates

**Kind**: inner class of [<code>euclidean</code>](#module_euclidean)  
<a name="module_euclidean..EuclideanReverse+translation"></a>

#### euclideanReverse.translation ⇒ <code>Array.&lt;number&gt;</code>
Get the effective shift post rotation

**Kind**: instance property of [<code>EuclideanReverse</code>](#module_euclidean..EuclideanReverse)  
**Returns**: <code>Array.&lt;number&gt;</code> - 3d vector of shift  
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
            * [.set_vec(qvec)](#module_quaternion..UnitQuaternion+set_vec) ⇒ <code>this</code>
            * [.set_axis(angle, vec)](#module_quaternion..UnitQuaternion+set_axis) ⇒ <code>this</code>
            * [.set_euler(yaw, pitch, roll)](#module_quaternion..UnitQuaternion+set_euler) ⇒ <code>this</code>
            * [.set_as_composite(first, second)](#module_quaternion..UnitQuaternion+set_as_composite) ⇒ <code>this</code>
            * [.mult(other)](#module_quaternion..UnitQuaternion+mult) ⇒ <code>UnitQuaternion</code>
            * [.then(other)](#module_quaternion..UnitQuaternion+then) ⇒ <code>UnitQuaternion</code>
            * [.rotate(vec)](#module_quaternion..UnitQuaternion+rotate) ⇒ <code>Array.&lt;number&gt;</code>
            * [.unrotate(vec)](#module_quaternion..UnitQuaternion+unrotate) ⇒ <code>Array.&lt;number&gt;</code>
            * [.rotate_ip(vec)](#module_quaternion..UnitQuaternion+rotate_ip) ⇒ <code>undefined</code>
            * [.unrotate_ip(vec)](#module_quaternion..UnitQuaternion+unrotate_ip) ⇒ <code>undefined</code>
        * _static_
            * [.from_vec(qvec)](#module_quaternion..UnitQuaternion.from_vec) ⇒ <code>UnitQuaternion</code>
            * [.from_axis(angle, vec)](#module_quaternion..UnitQuaternion.from_axis) ⇒ <code>UnitQuaternion</code>
            * [.from_euler(obj)](#module_quaternion..UnitQuaternion.from_euler) ⇒ <code>UnitQuaternion</code>

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
        * [.unrotate(vec)](#module_quaternion..UnitQuaternion+unrotate) ⇒ <code>Array.&lt;number&gt;</code>
        * [.rotate_ip(vec)](#module_quaternion..UnitQuaternion+rotate_ip) ⇒ <code>undefined</code>
        * [.unrotate_ip(vec)](#module_quaternion..UnitQuaternion+unrotate_ip) ⇒ <code>undefined</code>
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
            * [.then(other)](#module_shift..Shift+then) ⇒ <code>Shift</code>
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
        * [.then(other)](#module_shift..Shift+then) ⇒ <code>Shift</code>
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

<a name="module_shift..Shift+then"></a>

#### shift.then(other) ⇒ <code>Shift</code>
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

<a name="module_transform..Transform"></a>

### transform~Transform
Abstract base class for cooridnate transformation

**Kind**: inner class of [<code>transform</code>](#module_transform)  
