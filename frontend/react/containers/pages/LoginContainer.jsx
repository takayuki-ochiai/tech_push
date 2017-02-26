import React from 'react';
import MicroContainer from 'react-micro-container';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const paperStyle = {
  height: 400,
  width: 350,
  textAlign: 'center',
  display: 'inline-block'
};

const titleStyle = {
  textAlign: 'left'
};

const subheaderStyle = {
  textAlign: 'left',
  paddingLeft: '7%'
};

const buttonStyle = {
  color: 'white',
  width: '85%',
  textAlign: 'left',
  paddingLeft: '5%'
};

class LoginContainer extends MicroContainer {
  async onClickLoginButton() {
    const { uid, accessToken } = await this.props.fbClient.login();
    await this.props.apiResource.authenticate(uid, accessToken);
    if (this.props.apiResource.authorized) {
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <div
        style={{
          width: '100%'
        }}
      >
        <div
          style={{
            width: 350,
            marginTop: 100,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <Paper
            style={paperStyle}
            zDepth={3}
          >
            <AppBar
              zDepth={0}
              title="ログイン"
              titleStyle={titleStyle}
              showMenuIconButton={false}
            />
            <Subheader
              style={subheaderStyle}
            >
              ソーシャルアカウントでログイン
            </Subheader>
            <FlatButton
              label="Facebookでログイン"
              backgroundColor="#3b579d"
              style={buttonStyle}
              onClick={event => {
                event.preventDefault();
                this.onClickLoginButton();
              }}
              icon={<FontIcon className="fa fa-facebook-official" />}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
