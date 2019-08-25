// @flow

import _ from 'lodash';

export type Mesh = number[][][];

export type RectProps = {
  width: number,
  height: number,
};

type CircleProps = {
  scale: number,
  steps: number,
};

type HeartProps = {
  scale: number,
  steps: number,
};

function getPolarMeshBuilder({ getX, getY }) {
  return steps => {
    const tau = 2 * Math.PI;
    const angleStep = (2 * Math.PI) / steps;
    const edge = angle => [getX(angle), getY(angle)];
    return _.map(_.range(0, tau, angleStep), angle => [
      [0, 0],
      edge(angle + angleStep),
      edge(angle),
    ]);
  };
}

export function buildCircleMesh({ scale, steps }: CircleProps): Mesh {
  return getPolarMeshBuilder({
    getX: angle => scale * Math.sin(angle),
    getY: angle => -scale * Math.cos(angle),
  })(steps);
}

export function buildHeartMesh({ scale, steps }: HeartProps): Mesh {
  return getPolarMeshBuilder({
    getX: angle => scale * Math.sin(angle) ** 3,
    getY: angle =>
      scale *
      (-0.8125 * Math.cos(angle) +
        0.3125 * Math.cos(2 * angle) +
        0.125 * Math.cos(3 * angle) +
        0.0625 * Math.cos(4 * angle)),
  })(steps);
}

export function buildRectMesh({ width, height }: RectProps): Mesh {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const corners = [
    [-halfWidth, -halfHeight],
    [-halfWidth, halfHeight],
    [halfWidth, halfHeight],
    [halfWidth, -halfHeight],
  ];
  const mesh = [
    [corners[0], corners[1], corners[2]],
    [corners[2], corners[3], corners[0]],
  ];
  return mesh;
}

export function circlify(mesh: Mesh, radius: number): Mesh {
  return _.map(mesh, triangle =>
    _.map(triangle, ([x, y]) => {
      const magnitude = -radius + y;
      const angle = x / radius + Math.PI;
      return [magnitude * Math.sin(angle), -magnitude * Math.cos(angle)];
    })
  );
}
