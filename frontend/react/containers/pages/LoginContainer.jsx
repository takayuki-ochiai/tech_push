import React from 'react';
import MicroContainer from 'react-micro-container';
import { withRouter } from 'react-router';

class LoginContainer extends MicroContainer {
  async onClickLoginButton() {
    const uid = await this.props.fbClient.login();
    await this.props.apiResource.authenticate(uid);
    if (this.props.apiResource.authorized) {
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.onClickLoginButton();
          }}
        >
          ログインボタン
        </button>
      </div>
    );
  }
}

export default withRouter(LoginContainer);
