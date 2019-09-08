// @flow

import _ from 'lodash';
import flow from 'lodash/fp/flow';

import buildPrimitive from './buildPrimitive';
import { IDENTITY_MATRIX } from './graphics';
import dispatch, { addPrimitive } from '../state/actions';
import { getPrimitive } from '../state/getters';
import type { Regl } from 'regl';
import type { Component, Renderable } from './components/index';
import type { Matrix } from './graphics';
import type { Model } from './models/index';

type PrimitiveComponentProps<DynamicProps> = {
  model: Model,
  dynamicProps?: DynamicProps,
};
export type RenderContext = {
  getRenderable: (Component, ?Matrix) => Renderable,
  PrimitiveComponent: <DynamicProps>(
    PrimitiveComponentProps<DynamicProps>
  ) => Component,
  render: (...renderables: Array<?Renderable>) => Renderable,
  transformMatrix: (...transformations: Array<(Matrix) => Matrix>) => Matrix,
};
export type RenderContextBuilder = (Regl, Matrix) => RenderContext;

export default function renderContext(
  regl: Regl,
  matrix: Matrix = IDENTITY_MATRIX
): RenderContext {
  return {
    getRenderable: (component, newMatrix) =>
      component(
        newMatrix ? renderContext(regl, newMatrix) : renderContext(regl)
      ),
    // NOTE(gnewman): I think it's a flow bug, but we have to re-annotate the
    // function type here lest the generics throw a fit and get screwed up. It
    // works this way, so I'm leaving it until further notice! :)
    PrimitiveComponent: <DynamicProps>({
      model,
      dynamicProps,
    }: PrimitiveComponentProps<DynamicProps>) => {
      if (!getPrimitive(model.name)) {
        dispatch(
          addPrimitive(
            model.name,
            buildPrimitive({
              regl,
              model,
            })
          )
        );
      }
      const primitive = getPrimitive(model.name);

      return context => ({
        children: [],
        matrix,
        render: () =>
          primitive.command({
            modelMatrix: matrix,
            ...dynamicProps,
          }),
      });
    },
    render: (...children) => {
      const realChildren = _.compact(children);
      return {
        children: realChildren,
        matrix,
        render: () => _.each(_.reverse(realChildren), child => child.render()),
      };
    },
    transformMatrix: (...transformations) =>
      flow(transformations)(matrix),
  };
}
