import React, { Component } from 'react';
// Material UI 用ライブラリ
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// ルーティング用ライブラリ
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Layout from '../components/Layout';

import Books from './pages/BooksContainer';
import TopicSettings from './pages/TopicSettingsContainer';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Books} />
            <Route path="/topics/edit" component={TopicSettings} />
            <Route path="/topics/edit/:parentId" component={TopicSettings} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
