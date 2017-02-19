import React, { Component } from 'react';
// Material UI 用ライブラリ
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// ルーティング用ライブラリ
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Layout from '../components/Layout';
import ApiResource from '../models/ApiResource';
import FBClient from '../models/FBClient';
import UAParser from '../models/UAParser';

import Books from './pages/BooksContainer';
import TopicSettings from './pages/TopicSettingsContainer';
import Notices from './pages/NoticesContainer';
import Login from './pages/LoginContainer';

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

function injectGlobalState(WrappedComponent, globalState) {
  return class extends Component {
    render() {
      // ローカルコンポーネントで対象のコンポーネントのReact elementを返す
      return <WrappedComponent {...globalState} {...this.props} />;
    }
  };
}


class App extends Component {
  componentDidMount() {
    this.state = {
      fbClient: null,
      apiResource: null
    };
    this.initialize();
  }

  async initialize() {
    const fbClient = await FBClient.initialize();
    // ログインしてなかったらログイン画面へ
    // ログインしてたらリクエストされたページへ
    const apiResource = await ApiResource.initialize(fbClient.uid, fbClient.accessToken);
    this.setState({
      fbClient,
      apiResource
    });
    registerDevice(apiResource);
  }

  render() {
    if (!this.state || !this.state.apiResource) {
      return <div />;
    }

    const TopicSettingsPage = injectGlobalState(TopicSettings, this.state);

    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/login" component={injectGlobalState(Login, this.state)} />
          <Route path="/" component={injectGlobalState(Layout, this.state)}>
            <IndexRoute component={injectGlobalState(Books, this.state)} />
            <Route path="/topics/edit" component={TopicSettingsPage} />
            <Route path="/topics/edit/:parentId" component={TopicSettingsPage} />
            <Route path="/notices" component={injectGlobalState(Notices, this.state)} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
