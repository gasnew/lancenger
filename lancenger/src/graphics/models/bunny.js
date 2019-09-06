import bunny from 'bunny';
import normals from 'angle-normals';
import type { Model } from './index';

export const BUNNY: Model = {
  name: 'bunny',
  positions: bunny.positions,
  elements: bunny.cells,
  normals: normals(bunny.cells, bunny.positions),
};
