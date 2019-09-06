// @flow

import Bunny from './Bunny';
import { rotate, scale, translate } from '../graphics';
import Sand from './Sand';
import type { Component } from './index';

export default function Sandscape(): Component {
  return ({ getRenderable, PrimitiveComponent, render, transformMatrix }) =>
    render(
      getRenderable(Sand(), transformMatrix(scale(100))),
      getRenderable(
        Bunny(),
        transformMatrix(
          scale(5 * (Math.cos(Date.now() / 500) + 1.5)),
          rotate(Date.now() / 1000, [0, 1, 0]),
          translate([0, 50, 0])
        )
      )
    );
}
