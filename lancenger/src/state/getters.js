// @flow

import { IDENTITY_MATRIX } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';
import type { Bodies, Inputs, Lances, Primitives, State } from './state';

const DEFAULT_BODIES: Bodies = {
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
};

const DEFAULT_LANCES: Lances = {
    main: {
      id: 'main',
      bodyId: 'abc123',
    },
};

const DEFAULT_INPUTS: Inputs = {
  leftThumb: [0, 0],
  rightThumb: [0, 0],
  rightTrigger: 0,
};

const DEFAULT_STATE: State = {
  inputs: DEFAULT_INPUTS,
  bodies: DEFAULT_BODIES,
  lances: DEFAULT_LANCES,
  primitives: {},
};

export function getState(): State {
  return window.state || DEFAULT_STATE;
}

export function getInputs(): Inputs {
  return getState().inputs;
}

export function getPrimitives(): Primitives {
  return getState().primitives;
}

export function getPrimitive(primitiveId: string): Primitive<{}> {
  return getPrimitives()[primitiveId];
}
