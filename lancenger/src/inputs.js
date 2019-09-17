// @flow

import { multiply, rotate } from './graphics/graphics';
import dispatch, { addForce, setInputs, transformBody } from './state/actions';
import { getBody, getMainLance, getInputs } from './state/getters';

export default function processInputs() {
  if (!navigator.getGamepads) return;
  const gamepads = navigator.getGamepads();
  if (!gamepads[0]) return;
  const gamepad = gamepads[0];

  dispatch(
    setInputs({
      leftThumb: [gamepad.axes[0] || 0, -gamepad.axes[1] || 0],
      rightThumb: [gamepad.axes[2] || 0, -gamepad.axes[3] || 0],
      rightTrigger: gamepad.buttons[7].value || 0,
    })
  );

  const { leftThumb, rightTrigger } = getInputs();
  // NOTE: 
  const lanceBodyId = getMainLance().bodyId;

  dispatch(transformBody(lanceBodyId)(rotate(-leftThumb[0] / 10, [0, 1, 0])));
  if (rightTrigger === 0)
    return;
  const lanceBody = getBody(getMainLance().bodyId);
  dispatch(
    addForce(
      lanceBody.id,
      multiply([0, 0, 0, 1])(lanceBody.box.matrix),
      [rightTrigger, 0, 0, 0]
    )
  );
}
