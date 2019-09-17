// @flow

import _ from 'lodash';

import { multiply, scale, translate } from './graphics/graphics';
import dispatch, { transformBody } from './state/actions';
import { getBody, getForces } from './state/getters';

export default function applyForces(deltaTime: number) {
  const forces = getForces();

  _.each(forces, force => {
    console.log('vector');
    console.log(force.vector);
    console.log('direction');
    console.log(multiply([1, 0, 0, 0])(getBody(force.bodyId).box.matrix));
  });
  _.each(forces, force =>
    dispatch(transformBody(force.bodyId)(
      translate(force.vector)
    ))
  );
}
