// @flow

import type { Primitive } from '../graphics/buildPrimitive';

export type Position = {|
  x: number,
  y: number,
  z: number,
|};

export type Rotation = {|
  xAxis: number,
  yAxis: number,
  zAxis: number,
|};

export type Transformation = {|
  scale: number,
  matrix: number[],
|};

export type Box = {|
  transformation: Transformation,
  height: number,
  width: number,
  depth: number,
|};

export type Vector = {|
  x: number,
  y: number,
  z: number,
|};

export type Body = {|
  id: number,
  box: Box,
  velocity: Vector,
|};
export type Bodies = {
  [string]: Body,
};

export type Lance = {|
  bodyId: string,
|};
export type Lances = {
  [string]: Lance,
};

export type Primitives = {
  [string]: Primitive<{}>,
};

export type State = {|
  bodies: Bodies,
  lances: Lances,
  primitives: Primitives,
|};
