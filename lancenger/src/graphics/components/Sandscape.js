// @flow

import { toRGB } from '../graphics';
import { buildRectMesh } from '../meshes';
import type { Component } from './index';

export default function Sandscape(): Component {
  return ({ getRenderable, PrimitiveComponent, render }) =>
    render(
      getRenderable(
        PrimitiveComponent({
          type: 'Rectangle',
          buildMesh: buildRectMesh,
          meshProps: { height: 10, width: 10 },
          dynamicProps: { color: toRGB('#E0D7A8') },
        })
      )
    );
}
