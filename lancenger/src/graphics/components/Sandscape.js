// @flow

import Sand from './Sand';
import type { Component } from './index';

export default function Sandscape(): Component {
  return ({ getRenderable, PrimitiveComponent, render }) =>
    render(getRenderable(Sand()));
}
