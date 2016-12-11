import request from 'superagent';
import humps from 'humps';

class ApiResource {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  static initialize() {
    const newInstance = new Promise(
      resolve => {
        request
          .get('/api/v1/access_token')
          .end((err, res) => resolve(new this(res.body.accessToken)));
      }
    );
    console.log('new instance');
    return newInstance;
  }


  get(url, query = {}) {
    const result = new Promise(
      resolve => {
        request
          .get(url)
          .set('Access-Token', this.accessToken)
          .query(humps.decamelizeKeys(query))
          .end((err, res) => resolve(res));
      }
    );

    return result;
  }

  post(url, params = {}) {
    console.log(humps.decamelizeKeys(params));
    console.log(params);
    const result = new Promise(
      resolve => {
        request
          .post(url)
          .set('Access-Token', this.accessToken)
          .send(humps.decamelizeKeys(params))
          .end((err, res) => resolve(res));
      }
    );

    return result;
  }
}

export default ApiResource;
