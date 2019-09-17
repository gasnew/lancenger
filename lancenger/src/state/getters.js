// @flow

import { IDENTITY_MATRIX } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';
import type {
  Bodies,
  Body,
  Forces,
  Inputs,
  Lance,
  Lances,
  Primitives,
  State,
} from './state';

const DEFAULT_BODIES: Bodies = {
  abc123: {
    id: 'abc123',
    box: {
      matrix: IDENTITY_MATRIX,
      height: 1,
      width: 3,
      depth: 1,
    },
    velocity: [0, 0, 0],
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
  timestamp: 0,
  inputs: DEFAULT_INPUTS,
  forces: {},
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

export function getForces(): Forces {
  return getState().forces;
}

export function getBodies(): Bodies {
  return getState().bodies;
}

export function getBody(bodyId: string): Body {
  return getBodies()[bodyId];
}

export function getLances(): Lances {
  return getState().lances;
}

export function getLance(lanceId: string): Lance {
  return getLances()[lanceId];
}

export function getMainLance(): Lance {
  return getLance('main');
}

export function getPrimitives(): Primitives {
  return getState().primitives;
}

export function getPrimitive(primitiveId: string): Primitive<{}> {
  return getPrimitives()[primitiveId];
}

export function getTimestamp(): number {
  return getState().timestamp;
}
