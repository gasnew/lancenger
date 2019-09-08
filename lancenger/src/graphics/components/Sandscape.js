// @flow

import Bunny from './Bunny';
import { multiply, rotate, scale, translate } from '../graphics';
import Sand from './Sand';
import { getBody, getMainLance } from '../../state/getters';
import type { Component } from './index';

export default function Sandscape(): Component {
  return ({ getRenderable, PrimitiveComponent, render, transformMatrix }) =>
    render(
      getRenderable(Sand(), transformMatrix(scale(100))),
      getRenderable(
        Bunny(),
        transformMatrix(
          translate([0, 50, 0]),
          scale(5 * (Math.cos(Date.now() / 500) + 1.5)),
          multiply(getBody(getMainLance().bodyId).box.matrix)
        )
      )
    );
}
