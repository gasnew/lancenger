// @flow

import { BUNNY } from '../models/bunny';
import type { Component } from './index';

export default function Bunny(): Component {
  return ({ getRenderable, PrimitiveComponent, render }) =>
    render(
      getRenderable(
        PrimitiveComponent({
          model: BUNNY,
          dynamicProps: {
            color: [1, 1, 0.8],
          },
        })
      )
    );
}
