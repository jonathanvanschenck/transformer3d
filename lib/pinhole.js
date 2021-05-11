

function image( wvec, ivec, Q ) {
  // f = Q[2][3]
  // B = 1/Q[3][2]
  // Disparity:
  ivec[2] = Q[2][3] / ( wvec[2] * Q[3][2] );
  // i,j
  ivec[0] = wvec[0] * Q[2][3] / ivec[2] - Q[0][3];
  ivec[1] = wvec[1] * Q[2][3] / ivec[2] - Q[1][3];
}

function image_ip( wvec, Q ) {
  image( wvec, wvec, Q );
}

function project( ivec, wvec, Q ) {
  // f = Q[2][3]
  // B = 1/Q[3][2]
  // Z:
  wvec[2] = Q[2][3] / ( ivec[2] * Q[3][2] );
  // X,Y
  wvec[0] = ( ivec[0] + Q[0][3] ) * wvec[2] / Q[2][3];
  wvec[1] = ( ivec[1] + Q[1][3] ) * wvec[2] / Q[2][3];
}

function project_ip( ivec, Q ) {
  project( ivec, ivec, Q );
}

class PinholeCameraPair {
  constructor () {
    this.Q = [
      [ 0, 0, 0, 0],
      [ 0, 0, 0, 0],
      [ 0, 0, 0, 1],
      [ 0, 0, 1, 0]
    ]
  }

  set_Q ( Q ) { this.Q = Q; return this; }

  image ( wvec ) {
    let ivec = [ 0, 0, 0 ];
    image( wvec, ivec, this.Q );
    return ivec;
  }

  image_ip ( wvec ) { image_ip( wvec, this.Q ); }

  project ( ivec ) {
    let wvec = [ 0, 0, 0 ];
    project( ivec, wvec, this.Q );
    return wvec;
  }

  project_ip ( ivec ) { project_ip ( ivec, this.Q ); }
}



module.exports = exports = {
  PinholeCameraPair : PinholeCameraPair,
  image : image,
  image_ip : image_ip,
  project : project,
  project_ip : project_ip
};
