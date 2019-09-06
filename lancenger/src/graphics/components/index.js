// @flow

import type { Matrix } from '../graphics';
import type { RenderContext } from '../renderContext';

export type Renderable = {
  children: Renderable[],
  matrix: Matrix,
  render: () => any,
};
export type Component = RenderContext => Renderable;
