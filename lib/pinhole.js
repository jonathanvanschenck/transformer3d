/**
 * Some details:
 * Q: [
 *   [1, 0,   0, -ci],
 *   [0, 1,   0, -cj],
 *   [0, 0,   0,   f],
 *   [0, 0, 1/B,   0]
 * ]
 * Such that :  [x,y,z,w]^T = Q * [ i, j, d, 1]^T
 *
 * Qinv: [
 *   [1, 0, ci/f, 0],
 *   [0, 1, cj/f, 0],
 *   [0, 0,    0, B],
 *   [0, 0,  1/f, 0]
 * ]
 * Such that :  [i,j,d,w]^T = Qinv * [ x, y, z, 1]^T
 *
 * Where ci,cj are the pixel positions of the centers of the ccd,
 * f is the focal length (in pixels, NOT meters), and B is the 
 * distance (in meters, NOT pixels) between the two cameras
 */


function image( wvec, ivec, Qinv ) {
  // ivec = inhomo(Qinv @ [wvec,1])
  // f = 1/Qinv[3][2]
  // B = Qinv[2][3]

  // Get i and j
  ivec[0] = wvec[0] + Qinv[0][2] * wvec[2];
  ivec[1] = wvec[1] + Qinv[1][2] * wvec[2];
  // Cache value of 1/w
  ivec[2] = 1 / (wvec[2] * Qinv[3][2]); 
  // Get i/w, j/w
  ivec[0] *= ivec[2];
  ivec[1] *= ivec[2];
  // Calculate d/w
  ivec[2] *= Qinv[2][3];
}

function image_ip( wvec, Q ) {
  image( wvec, wvec, Q );
}

function project( ivec, wvec, Q ) {
  // f = Q[2][3]
  // B = 1/Q[3][2]

  // get x and y
  wvec[0] = ivec[0] + Q[0][3];
  wvec[1] = ivec[1] + Q[1][3];
  // cache the value of 1/w
  wvec[2] = 1 / (ivec[2] * Q[3][2]);
  // get x/w and y/w
  wvec[0] *= wvec[2];
  wvec[1] *= wvec[2];
  // get z/w
  wvec[2] *= Q[2][3];
}

function project_ip( ivec, Q ) {
  project( ivec, ivec, Q );
}

class PinholeCameraPair {
  constructor () {
    this._Q = [ // [x,y,z,w] = Q * [ i, j, k, 1]
      [ 1, 0, 0, 0],
      [ 0, 1, 0, 0],
      [ 0, 0, 0, 1],
      [ 0, 0, 1, 0]
    ]
    this._Q_inv = [ // [i,j,d,w] = Qinv * [ x, y, z, 1]
      [ 1, 0, 0, 0],
      [ 0, 1, 0, 0],
      [ 0, 0, 0, 1],
      [ 0, 0, 1, 0]
    ]
  }
  
  get Q() { return this._Q; }
  get Q_inv() { return this._Q_inv; }
  set_Q ( Q ) { this._Q = Q; this.__update_Q_inv(); return this; }

  __update_Q_inv () {
    this._Q_inv = [
      [1, 0, -this.Q[0][3] / this.Q[2][3],                0 ],
      [0, 1, -this.Q[1][3] / this.Q[2][3],                0 ],
      [0, 0,                            0, 1 / this.Q[3][2] ],
      [0, 0,             1 / this.Q[2][3],                0 ]
    ]
  }

  image ( wvec ) {
    let ivec = [ 0, 0, 0 ];
    image( wvec, ivec, this._Q_inv );
    return ivec;
  }

  image_ip ( wvec ) { image_ip( wvec, this._Q_inv ); }

  project ( ivec ) {
    let wvec = [ 0, 0, 0 ];
    project( ivec, wvec, this._Q );
    return wvec;
  }

  project_ip ( ivec ) { project_ip ( ivec, this._Q ); }
}



module.exports = exports = {
  PinholeCameraPair : PinholeCameraPair,
  image : image,
  image_ip : image_ip,
  project : project,
  project_ip : project_ip
};
