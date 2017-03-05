import React, { Component } from 'react';
// Material UI 用ライブラリ
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// ルーティング用ライブラリ
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Layout from '../components/Layout';
import ApiResource from '../models/ApiResource';
import FBClient from '../models/FBClient';
import DeviceRegister from '../models/DeviceRegister';

import Books from './pages/BooksContainer';
import TopicSettings from './pages/TopicSettingsContainer';
import Notices from './pages/NoticesContainer';
import Login from './pages/LoginContainer';
import { injectBaseFunction, forceLogin } from './injector';

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
    DeviceRegister.register(apiResource);
  }

  render() {
    if (!this.state || !this.state.apiResource) {
      return <div />;
    }


    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={injectBaseFunction(Layout, this.state)}>
            <IndexRoute component={injectBaseFunction(Books, this.state)} />
            <Route path="/login" component={injectBaseFunction(Login, this.state)} />
            <Route path="/topics/edit" component={forceLogin(TopicSettings, this.state)} />
            <Route path="/topics/edit/:parentId" component={forceLogin(TopicSettings, this.state)} />
            <Route path="/notices" component={forceLogin(Notices, this.state)} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
