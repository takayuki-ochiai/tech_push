import React from 'react';

// ルーティング用ライブラリ
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Layout from '../components/Layout';

// Material UI 用ライブラリ
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import { grey50, redA200 } from 'material-ui/styles/colors';

import Root from './pages/RootContainer';
import TopicSettings from './pages/TopicSettingsContainer';

// immutable.jsとreact-router-reduxを併用する場合はselectLocationStateオプションに下記をセットする必要がある
// redux-immutableを使っていないのでstate.get('routing')ではない
// const muiTheme = getMuiTheme();

const App = () => (
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Root} />
        <Route path="/topics/edit" component={TopicSettings} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

export default App;
