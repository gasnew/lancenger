// @flow

import flow from 'lodash/fp/flow';
import uniqid from 'uniqid';

import {
  getBodies,
  getBody,
  getForces,
  getPrimitives,
  getState,
} from './getters';
import type { Matrix, Transform } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';
import type { Body, Force, Inputs, State } from './state';

const ADD_FORCE = 'addForce';
const ADD_PRIMITIVE = 'addPrimitive';
const CLEAR_FORCES = 'clearForces';
const SET_INPUTS = 'setInputs';
const SET_TIMESTAMP = 'setTimestamp';
const TRANSFORM_BODY = 'transformBody';

type Action =
  | {
      type: 'addForce',
      force: Force,
    }
  | {
      type: 'addPrimitive',
      name: string,
      primitive: Primitive<{}>,
    }
  | {
      type: 'clearForces',
    }
  | {
      type: 'setInputs',
      inputs: Inputs,
    }
  | {
      type: 'setTimestamp',
      time: number,
    }
  | {
      type: 'transformBody',
      bodyId: string,
      matrix: Matrix,
    };

const mergeIntoState = (key: $Keys<State>, subState: $Values<State>) => {
  window.state = {
    ...getState(),
    [key]: subState,
  };
};

const mergeIntoBodies = (bodyId: string, body: Body) => {
  mergeIntoState('bodies', {
    ...getBodies(),
    [bodyId]: body,
  });
};

const mergeIntoForces = (forceId: string, force: Force) => {
  mergeIntoState('forces', {
    ...getForces(),
    [forceId]: force,
  });
};

const mergeIntoPrimitives = (primitiveId: string, primitive: Primitive<{}>) => {
  mergeIntoState('primitives', {
    ...getPrimitives(),
    [primitiveId]: primitive,
  });
};

export function addForce(
  bodyId: string,
  position: number[],
  vector: number[]
): Action {
  return {
    type: ADD_FORCE,
    force: {
      id: uniqid(),
      bodyId,
      position,
      vector,
    },
  };
}

export function addPrimitive(name: string, primitive: Primitive<{}>): Action {
  return {
    type: ADD_PRIMITIVE,
    name,
    primitive,
  };
}

export function clearForces(): Action {
  return {
    type: CLEAR_FORCES,
  };
}

export function setInputs(inputs: Inputs): Action {
  return {
    type: SET_INPUTS,
    inputs,
  };
}

export function setTimestamp(time: number): Action {
  return {
    type: SET_TIMESTAMP,
    time,
  };
}

export function transformBody(bodyId: string) {
  return (...transformations: Transform[]) => ({
    type: TRANSFORM_BODY,
    bodyId,
    matrix: flow(transformations)(getBody(bodyId).box.matrix),
  });
}

export default function dispatch(action: Action) {
  switch (action.type) {
    case ADD_FORCE:
      mergeIntoForces(action.force.id, action.force);
      break;
    case ADD_PRIMITIVE:
      mergeIntoPrimitives(action.name, action.primitive);
      break;
    case CLEAR_FORCES:
      mergeIntoState('forces', {});
      break;
    case SET_INPUTS:
      mergeIntoState('inputs', action.inputs);
      break;
    case SET_TIMESTAMP:
      mergeIntoState('timestamp', action.time);
      break;
    case TRANSFORM_BODY:
      const body = getBody(action.bodyId);
      mergeIntoBodies(action.bodyId, {
        ...body,
        box: {
          ...body.box,
          matrix: action.matrix,
        },
      });
      //console.log(window.state.timestamp, action.matrix);
      break;
    default:
      throw new Error(`Yo, action ${action.type} doesn't exist!`);
  }
}
