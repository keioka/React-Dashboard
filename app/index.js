import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from '@components/App';
import configureStore from '@redux/store/configureStore';
import registerServiceworker from '@utils/registerServiceworker';
import sagas from '@redux/sagas';
import './styles/global.scss';

// import './assets/fonts/Open_Sans/OpenSans-Bold.ttf';

const history = createHistory();
const store = configureStore();
store.runSaga(sagas);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newConfigureStore = require('./redux/store/configureStore');
    const newStore = newConfigureStore.configureStore();
    render(
      <Provider store={newStore}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    );
  });
}
