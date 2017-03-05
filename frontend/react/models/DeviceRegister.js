import UAParser from './UAParser';

export default class DeviceRegister {
  static delay(millSecond) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), millSecond);
    });
  }

  static async fetchPlayerId() {
    let playerId = await OneSignal.getUserId();
    while (!playerId) {
      playerId = await OneSignal.getUserId();
      await this.delay(2000);
    }

    return playerId;
  }

  static async register(apiResource) {
    // facebookログイン済みで認証されている時だけデバイス登録実行
    if (!apiResource.authorized) {
      return;
    }

    const body = await apiResource.get('/api/v1/user');
    const devices = body.user.devices;
    const playerId = await this.fetchPlayerId();
    if (!devices.some(device => device.oneSignalPlayerId === playerId)) {
      const device = UAParser.device;
      // デバイスがiOSの場合はWeb Pushできないのでデバイス登録しない
      if (device.deviceModel !== 'iOS') {
        const param = Object.assign({ oneSignalPlayerId: playerId }, device);
        apiResource.post('/api/v1/user/device', param);
      }
    }
  }
}
