// @flow

import type { Regl } from 'regl';

import type { Model } from './models/index';

export type Command<Props> = Props => void;
export type Primitive<Props> = {|
  command: Command<Props>,
|};

type Props = {
  regl: Regl,
  model: Model,
};

export default function buildPrimitive({ regl, model }: Props): Primitive<{}> {
  return {
    command: regl({
      uniforms: {
        model: regl.prop('modelMatrix'),
        color: regl.prop('color'),
      },
      attributes: {
        position: model.positions,
        normal: model.normals,
      },
      elements: model.elements,
      cull: {
        enable: true,
      },
    }),
  };
}
