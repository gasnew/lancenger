// @flow

import type { RenderContext } from '../renderContext';
import type { Transformation } from '../../state/state';

export type Renderable = {
  children: Renderable[],
  transformation: Transformation,
  render: () => any,
};
export type Component = RenderContext => Renderable;
