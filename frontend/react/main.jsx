import React from 'react';
import { render } from 'react-dom';
// hotloading用Container
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import ApiResource from './models/ApiResource';
import UAParser from './models/UAParser';
// immutable.jsとreact-router-reduxを併用する場合はselectLocationStateオプションに下記をセットする必要がある
// redux-immutableを使っていないのでstate.get('routing')ではない
// const muiTheme = getMuiTheme();


// // Material UIを使用する場合、ReactがV1.0になるまでは必要らしい
injectTapEventPlugin();

if (window.location.hash === '#_=_') {
  window.location.hash = '';
}

function delay(millSecond) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), millSecond);
  });
}

async function fetchPlayerId() {
  let playerId = await OneSignal.getUserId();
  while (!playerId) {
    playerId = await OneSignal.getUserId();
    await delay(2000);
  }

  return playerId;
}

async function registerDevice(apiResource) {
  const body = await apiResource.get('/api/v1/user');
  const devices = body.user.devices;
  const playerId = await fetchPlayerId();
  if (!devices.some(device => device.oneSignalPlayerId === playerId)) {
    const device = UAParser.device;
    // デバイスがiOSの場合はWeb Pushできないのでデバイス登録しない
    if (device.deviceModel !== 'iOS') {
      const param = Object.assign({ oneSignalPlayerId: playerId }, device);
      apiResource.post('/api/v1/user/device', param);
    }
  }
}

async function initialize() {
  const apiResource = await ApiResource.initialize();
  registerDevice(apiResource);
  // あとはサーバーからpush通知を送れるようにする
  exports.apiResource = apiResource;

  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
}

initialize();
