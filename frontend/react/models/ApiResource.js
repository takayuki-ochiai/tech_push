import request from 'superagent';
import humps from 'humps';

class ApiResource {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  static initialize(uid, fbToken) {
    const newInstance = new Promise(
      resolve => {
        request
          .get('/api/v1/access_token')
          .set('Uid', uid)
          .set('Fb-Token', fbToken)
          .end((err, res) => resolve(new this(res.body.accessToken)));
      }
    );
    return newInstance;
  }

  authenticate(uid, fbToken) {
    const self = this;
    const promise = new Promise(
      resolve => {
        request
          .get('/api/v1/access_token')
          .set('Uid', uid)
          .set('Fb-Token', fbToken)
          .end((err, res) => {
            self.accessToken = res.body.accessToken;
            resolve(self);
          });
      }
    );
    return promise;
  }

  get authorized() {
    if (this.accessToken) {
      return true;
    }
    return false;
  }

  get(url, query = {}) {
    const result = new Promise(
      resolve => {
        request
          .get(url)
          .set('Access-Token', this.accessToken)
          .query(humps.decamelizeKeys(query))
          .end((err, res) => {
            if (err) {
              resolve({
                error: err,
                status: res.status
              });
            } else {
              resolve(res.body);
            }
          });
      }
    );

    return result;
  }

  post(url, params = {}) {
    const result = new Promise(
      resolve => {
        request
          .post(url)
          .set('Access-Token', this.accessToken)
          .send(humps.decamelizeKeys(params))
          .end((err, res) => {
            if (err) {
              resolve({
                error: err,
                status: res.status
              });
            } else {
              resolve(res.body);
            }
          });
      }
    );

    return result;
  }
}

export default ApiResource;
