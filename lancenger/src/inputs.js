// @flow

import { normal } from './graphics/graphics';
import dispatch, { setInputs } from './state/actions';

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

  //const lanceBody = getBody(getMainLance().bodyId);
  //dispatch(
    //addForce({
      //bodyId: lanceBody.id,
      //position: lanceBody.position,
      //vector: multiplyVector(lanceBody.matrix, [
        //getInputs().rightTrigger,
        //0,
        //0,
      //]),
    //})
  //);
}
