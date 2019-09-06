// @flow

import mat4 from 'gl-mat4';
import _ from 'lodash';

import type { Position, Rotation } from '../state/state';

export type Matrix = number[];

export function toRGB(hex: string): Array<number> {
  var result: ?Array<string> = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex
  );
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
        1,
      ]
    : [1, 0, 0, 1];
}

export function glifyPosition(position: Position): number[] {
  return [position.x, position.y, position.z];
}

export function glifyRotation(rotation: Rotation): number[] {
  return [rotation.xAxis, rotation.yAxis, rotation.zAxis];
}

export function glifyScale(scale: number): number[] {
  return [scale, scale, scale];
}

type Transform = Matrix => Matrix;

export function scale(scale: number): Transform {
  return matrix => {
    mat4.scale(matrix, matrix, [scale, scale, scale]);
    return matrix;
  };
}

export function rotate(angle: number, axis: number[]): Transform {
  return matrix => {
    mat4.rotate(matrix, matrix, angle, axis);
    return matrix;
  };
}

export function translate(translation: number[]): Transform {
  return matrix => {
    mat4.translate(matrix, matrix, translation);
    return matrix;
  };
}

export function normal(vector: number[]): number[] {
  const magnitude = Math.sqrt(
    Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
  );
  return _.map(vector, dimension => dimension / magnitude);
}
