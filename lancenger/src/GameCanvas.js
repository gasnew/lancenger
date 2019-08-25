// @flow

import React from 'react';

import render from './graphics/renderer';

function GameCanvas() {
  let canvasRef = React.createRef();

  // $FlowFixMe: Need a way to notify this component when current is available?
  render(canvasRef.current);

  return (
    <div
      ref={canvasRef}
      style={{ height: '770px' }}
    />
  );
}

export default GameCanvas;
