// @flow

import type { Matrix } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';

export type Box = {|
  matrix: Matrix,
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
  id: string,
  box: Box,
  velocity: Vector,
|};
export type Bodies = {
  [string]: Body,
};

export type Lance = {|
  id: string,
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
