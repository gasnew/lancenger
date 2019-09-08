// @flow

import flow from 'lodash/fp/flow';

import { getBodies, getBody, getPrimitives, getState } from './getters';
import type { Matrix, Transform } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';
import type { Body, Inputs, State } from './state';

const ADD_PRIMITIVE = 'addPrimitive';
const SET_INPUTS = 'setInputs';
const TRANSFORM_BODY = 'transformBody';

type Action =
  | {
      type: 'addPrimitive',
      name: string,
      primitive: Primitive<{}>,
    }
  | {
      type: 'setInputs',
      inputs: Inputs,
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

const mergeIntoPrimitives = (primitiveId: string, primitive: Primitive<{}>) => {
  mergeIntoState('primitives', {
    ...getPrimitives(),
    [primitiveId]: primitive,
  });
};

export function addPrimitive(name: string, primitive: Primitive<{}>): Action {
  return {
    type: ADD_PRIMITIVE,
    name,
    primitive,
  };
}

export function setInputs(inputs: Inputs): Action {
  return {
    type: SET_INPUTS,
    inputs,
  };
}

export function transformBody(bodyId: string, ...transformations: Transform[]) {
  return {
    type: TRANSFORM_BODY,
    bodyId,
    matrix: flow(transformations)(getBody(bodyId).box.matrix),
  };
}

export default function dispatch(action: Action) {
  switch (action.type) {
    case ADD_PRIMITIVE:
      mergeIntoPrimitives(action.name, action.primitive);
      break;
    case SET_INPUTS:
      mergeIntoState('inputs', action.inputs);
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
      break;
    default:
      throw new Error(`Yo, action ${action.type} doesn't exist!`);
  }
}
