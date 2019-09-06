// @flow

import { getPrimitives, getState } from './getters';
import type { Primitive } from '../graphics/buildPrimitive';

const ADD_PRIMITIVE = 'addPrimitive';

type Action = {
  type: 'addPrimitive',
  name: string,
  primitive: Primitive<{}>,
};

const mergeIntoState = (key, subState) => {
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

export default function dispatch(action: Action) {
  switch (action.type) {
    case ADD_PRIMITIVE:
      mergeIntoPrimitives(action.name, action.primitive);
      break;
    default:
      throw new Error(`Yo, action ${action.type} doesn't exist!`);
  }
}
