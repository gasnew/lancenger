// @flow

import { BOX } from '../models/box';
import type { Component } from './index';

export default function Sand(): Component {
  return ({ getRenderable, PrimitiveComponent, render }) =>
    render(
      getRenderable(
        PrimitiveComponent({
          model: BOX,
          dynamicProps: {
            color: [1, 0.5, 0.5],
          },
        })
      )
    );
}
