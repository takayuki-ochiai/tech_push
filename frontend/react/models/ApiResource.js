import request from 'superagent';
import humps from 'humps';

class ApiResource {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  static initialize(uid) {
    const newInstance = new Promise(
      resolve => {
        request
          .get('/api/v1/access_token')
          .set('User-Id', uid)
          .end((err, res) => resolve(new this(res.body.accessToken)));
      }
    );
    return newInstance;
  }

  authenticate(uid) {
    const promise = new Promise(
      resolve => {
        request
          .get('/api/v1/access_token')
          .set('User-Id', uid)
          .end((err, res) => {
            this.accessToken = res.body.accessToken;
            resolve(this);
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
