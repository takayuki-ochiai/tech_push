import React from 'react';
import { render } from 'react-dom';

// ルーティング用ライブラリ
import { Router, Route, hashHistory } from 'react-router';

// Material UI 用ライブラリ
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import { grey50, redA200 } from 'material-ui/styles/colors';

import Root from './components/page/Root';
import Sample from './components/page/Sample';



// Material UIを使用する場合、ReactがV1.0になるまでは必要らしい
// injectTapEventPlugin();


// immutable.jsとreact-router-reduxを併用する場合はselectLocationStateオプションに下記をセットする必要がある
// redux-immutableを使っていないのでstate.get('routing')ではない
// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: grey50,
//     accent1Color: redA200,
//   },
// });

render(
  <Router history={hashHistory}>
    <Route path="/" component={Root} />
    <Route path="/sample" component={Sample} />
  </Router>,
  document.getElementById('app')
);
