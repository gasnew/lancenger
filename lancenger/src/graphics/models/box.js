// @flow

import type { Model } from './index';

export const BOX: Model = {
  name: 'box',
  positions: [
    // side faces
    [-0.5, +0.5, +0.5],
    [+0.5, +0.5, +0.5],
    [+0.5, -0.5, +0.5],
    [-0.5, -0.5, +0.5], // positive z face.
    [+0.5, +0.5, +0.5],
    [+0.5, +0.5, -0.5],
    [+0.5, -0.5, -0.5],
    [+0.5, -0.5, +0.5], // positive x face
    [+0.5, +0.5, -0.5],
    [-0.5, +0.5, -0.5],
    [-0.5, -0.5, -0.5],
    [+0.5, -0.5, -0.5], // negative z face
    [-0.5, +0.5, -0.5],
    [-0.5, +0.5, +0.5],
    [-0.5, -0.5, +0.5],
    [-0.5, -0.5, -0.5], // negative x face.
    [-0.5, +0.5, -0.5],
    [+0.5, +0.5, -0.5],
    [+0.5, +0.5, +0.5],
    [-0.5, +0.5, +0.5], // top face
    [-0.5, -0.5, -0.5],
    [+0.5, -0.5, -0.5],
    [+0.5, -0.5, +0.5],
    [-0.5, -0.5, +0.5], // bottom face
  ],
  elements: [
    [2, 1, 0],
    [2, 0, 3],
    [6, 5, 4],
    [6, 4, 7],
    [10, 9, 8],
    [10, 8, 11],
    [14, 13, 12],
    [14, 12, 15],
    [18, 17, 16],
    [18, 16, 19],
    [20, 21, 22],
    [23, 20, 22],
  ],
  normals: [
    // side faces
    [0.0, 0.0, +1.0],
    [0.0, 0.0, +1.0],
    [0.0, 0.0, +1.0],
    [0.0, 0.0, +1.0],
    [+1.0, 0.0, 0.0],
    [+1.0, 0.0, 0.0],
    [+1.0, 0.0, 0.0],
    [+1.0, 0.0, 0.0],
    [0.0, 0.0, -1.0],
    [0.0, 0.0, -1.0],
    [0.0, 0.0, -1.0],
    [0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.0],
    [-1.0, 0.0, 0.0],
    [-1.0, 0.0, 0.0],
    [-1.0, 0.0, 0.0],
    // top
    [0.0, +1.0, 0.0],
    [0.0, +1.0, 0.0],
    [0.0, +1.0, 0.0],
    [0.0, +1.0, 0.0],
    // bottom
    [0.0, -1.0, 0.0],
    [0.0, -1.0, 0.0],
    [0.0, -1.0, 0.0],
    [0.0, -1.0, 0.0],
  ],
};
