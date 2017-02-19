export default class FBClient {
  constructor(status, accessToken, uid) {
    this.status = status;
    this.accessToken = accessToken;
    this.uid = uid;
  }

  static initialize() {
    const newInstance = new Promise(resolve => {
      FB.getLoginStatus(response => {
        const status = response.status;
        if (response.status === 'connected') {
          const uid = response.authResponse.userID;
          const accessToken = response.authResponse.accessToken;
          resolve(new this(status, accessToken, uid));
        } else {
          resolve(new this(status));
        }
      });
    });
    return newInstance;
  }

  async login() {
    return new Promise(resolve => {
      FB.login(response => {
        if (response.status === 'connected') {
          this.status = response.status;
          this.accessToken = response.authResponse.accessToken;
          this.uid = response.authResponse.userID;
        } else {
          this.status = response.status;
        }
        resolve({
          uid: this.uid,
          accessToken: this.accessToken
        });
      });
    });
  }

  async syncApi(path, method, params) {
    const requestParams = Object.assign(
      { access_token: this.accessToken },
      params
    );

    return new Promise(resolve => {
      FB.api(path, method, requestParams, res => {
        resolve(res);
      });
    });
  }
}
