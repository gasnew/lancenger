// @flow

import fit from 'canvas-fit'
import React, { useEffect } from 'react';

import render from './graphics/renderer';

const RESOLUTION_SCALE = 0.35;

const fitCanvas = canvas => {
  fit(canvas);
  canvas.height = canvas.height * RESOLUTION_SCALE;
  canvas.width = canvas.width * RESOLUTION_SCALE;
}

function GameCanvas() {
  const canvasRef = React.createRef();

  useEffect(() => {
    // The component "did mount" after the DOM is initially rendered, so we can
    // know that current is not null by this point
    // $FlowFixMe
    const canvas = (canvasRef.current: HTMLCanvasElement);
    fitCanvas(canvas);
    window.addEventListener('resize', () => fitCanvas(canvas), false);
    render(canvas);
  });

  return <canvas ref={canvasRef} />;
}

export default GameCanvas;
