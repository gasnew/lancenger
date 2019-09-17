// @flow

import type { Matrix } from '../graphics/graphics';
import type { Primitive } from '../graphics/buildPrimitive';

export type Inputs = {|
  leftThumb: number[],
  rightThumb: number[],
  rightTrigger: number,
|};

export type Box = {|
  matrix: Matrix,
  height: number,
  width: number,
  depth: number,
|};

export type Force = {|
  id: string,
  bodyId: string,
  position: number[],
  vector: number[],
|};
export type Forces = {
  [string]: Force,
};

export type Vector = {|
  x: number,
  y: number,
  z: number,
|};

export type Body = {|
  id: string,
  box: Box,
  velocity: number[],
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
  timestamp: number,
  forces: Forces,
  inputs: Inputs,
  bodies: Bodies,
  lances: Lances,
  primitives: Primitives,
|};
