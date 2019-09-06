// @flow

import { IDENTITY_MATRIX } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';
import type { Primitives, State } from './state';

const DEFAULT_STATE: State = {
  bodies: {
    abc123: {
      id: 'abc123',
      box: {
        matrix: IDENTITY_MATRIX,
        height: 1,
        width: 1,
        depth: 3,
      },
      velocity: { x: 0, y: 0, z: 0 },
    },
  },
  lances: {
    main: {
      id: 'main',
      bodyId: 'abc123',
    },
  },
  primitives: {},
};

export function getState(): State {
  return window.state || DEFAULT_STATE;
}

export function getPrimitives(): Primitives {
  return getState().primitives;
}

export function getPrimitive(primitiveId: string): Primitive<{}> {
  return getPrimitives()[primitiveId];
}
