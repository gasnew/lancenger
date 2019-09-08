// @flow

import { getPrimitives, getState } from './getters';
import type { Primitive } from '../graphics/buildPrimitive';
import type { Inputs, State } from './state';

const ADD_PRIMITIVE = 'addPrimitive';
const SET_INPUTS = 'setInputs';

type Action = {
  type: 'addPrimitive',
  name: string,
  primitive: Primitive<{}>,
}| {
  type: 'setInputs',
  inputs: Inputs,
};

const mergeIntoState = (key: $Keys<State>, subState: $Values<State>) => {
  window.state = {
    ...getState(),
    [key]: subState,
  };
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

export default function dispatch(action: Action) {
  switch (action.type) {
    case ADD_PRIMITIVE:
      mergeIntoPrimitives(action.name, action.primitive);
      break;
    case SET_INPUTS:
      mergeIntoState('inputs', action.inputs);
      break;
    default:
      throw new Error(`Yo, action ${action.type} doesn't exist!`);
  }
}
