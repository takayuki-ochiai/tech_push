import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
// hotloading用Container
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';
// immutable.jsとreact-router-reduxを併用する場合はselectLocationStateオプションに下記をセットする必要がある
// redux-immutableを使っていないのでstate.get('routing')ではない
// const muiTheme = getMuiTheme();

if (window.location.hash === '#_=_') {
  window.location.hash = '';
}

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);
