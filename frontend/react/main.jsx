import React from 'react';
import { render } from 'react-dom';
// hotloading用Container
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';

// // Material UIを使用する場合、ReactがV1.0になるまでは必要らしい
injectTapEventPlugin();

if (process.env.NODE_ENV === 'production') {
  render(
    <App />,
    document.getElementById('app')
  );
} else {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
}
