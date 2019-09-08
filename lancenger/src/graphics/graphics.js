// @flow

import mat4 from 'gl-mat4';
import _ from 'lodash';

export type Matrix = number[];

export const IDENTITY_MATRIX: Matrix = mat4.identity([]);

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

export type Transform = Matrix => Matrix;

export function scale(scale: number): Transform {
  return matrix => {
    return mat4.scale(mat4.identity([]), matrix, [scale, scale, scale]);
  };
}

export function rotate(angle: number, axis: number[]): Transform {
  return matrix => {
    return mat4.rotate(mat4.identity([]), matrix, angle, axis);
  };
}

export function translate(translation: number[]): Transform {
  return matrix => {
    return mat4.translate(mat4.identity([]), matrix, translation);
  };
}

export function multiply(matrixB: number[]): Transform {
  return matrixA => {
    return mat4.multiply(mat4.identity([]), matrixA, matrixB);
  };
}

export function normal(vector: number[]): number[] {
  const magnitude = Math.sqrt(
    _.reduce(vector, (sum, dimension) => sum + Math.pow(dimension, 2), 0)
  );
  return _.map(vector, dimension => dimension / magnitude);
}
