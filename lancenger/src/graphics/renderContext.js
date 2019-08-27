// @flow

import _ from 'lodash';

import { transform, glifyPosition } from './graphics';
import buildPrimitive from './buildPrimitive';
import dispatch, { addPrimitive } from '../state/actions';
import { getPrimitive, getStageDimensions } from '../state/getters';
import type { Regl } from 'regl';
import type { Component, Renderable } from './components/index';
import type { Model } from './models/index';
import type { Transformation } from '../state/state';

type PrimitiveComponentProps<DynamicProps> = {
  model: Model,
  dynamicProps?: DynamicProps,
};
export type RenderContext = {
  getRenderable: (Component, ?Transformation) => Renderable,
  PrimitiveComponent: <DynamicProps>(
    PrimitiveComponentProps<DynamicProps>
  ) => Component,
  render: (...renderables: Array<?Renderable>) => Renderable,
};
export type RenderContextBuilder = (Regl, Transformation) => RenderContext;

const TRANSFORMATION_IDENTITY: Transformation = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    xAxis: 0,
    yAxis: 0,
    zAxis: 0,
  },
  scale: 100,
};

export default function renderContext(
  regl: Regl,
  transformation: Transformation = TRANSFORMATION_IDENTITY
): RenderContext {
  return {
    getRenderable: (component, newTransformation) =>
      component(
        renderContext(
          regl,
          transform(
            transformation,
            newTransformation || TRANSFORMATION_IDENTITY
          )
        )
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
        transformation,
        render: () =>
          primitive.command({
            scale: transformation.scale,
            position: glifyPosition(transformation.position),
            ...dynamicProps,
          }),
      });
    },
    render: (...children) => {
      const realChildren = _.compact(children);
      return {
        children: realChildren,
        transformation,
        render: () => _.each(_.reverse(realChildren), child => child.render()),
      };
    },
  };
}
