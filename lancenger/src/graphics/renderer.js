// @flow

import Sandscape from './components/Sandscape';
import renderContext from './renderContext';
import { toRGB } from './graphics';

import startRegl from 'regl';

export default function render(element: HTMLDivElement) {
  const regl = startRegl(element);

  regl.frame(({ time }) => {
    regl.clear({
      color: toRGB('#BEE9E8'),
      depth: 1,
    });

    renderContext(regl, { x: 0, y: 0 })
      .getRenderable(Sandscape(), { x: 0, y: 0 })
      .render();
  });
}
