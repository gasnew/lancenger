// @flow

import mat4 from 'gl-mat4';
import _ from 'lodash';
import type { Regl } from 'regl';

import { stagifyMesh } from './graphics';
import { primitiveVertexShader, solidFragmentShader } from './shaders';
import type { Model } from './models/index';

export type Command<Props> = (Props) => void;
export type Primitive<Props> = {|
  command: Command<Props>,
|};

type Props = {
  regl: Regl,
  model: Model,
};

export default function buildPrimitive({
  regl,
  model,
}: Props): Primitive<{}> {
  return {
    command: regl({
      uniforms: {
        model: (_, props, batchId) => {
          // we create the model matrix by combining
          // translation, scaling and rotation matrices.
          console.log(props);
          var m = mat4.identity([]);

          mat4.translate(m, m, props.position);
          var s = props.scale;

          if (typeof s === 'number') {
            mat4.scale(m, m, [s, s, s]);
          } else {
            // else, we assume an array
            mat4.scale(m, m, s);
          }

          if (typeof props.yRotate !== 'undefined') {
            mat4.rotateY(m, m, props.yRotate);
          }

          return m;
        },
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
