/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Socket from './Socket';

const Root = () => (
  <Provider store={store}>
    <Socket>
      <App />
    </Socket>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
