import React, { Component } from 'react';

// ルーティング用ライブラリ
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Layout from '../components/Layout';

// Material UI 用ライブラリ
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import { grey50, redA200 } from 'material-ui/styles/colors';

import Root from './pages/RootContainer';
import TopicSettings from './pages/TopicSettingsContainer';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Root} />
            <Route path="/topics/edit" component={TopicSettings} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
