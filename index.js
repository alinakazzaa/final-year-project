/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Router from './src/navigation/router';
import configureStore from './src/store/configureStore';

const store = configureStore()

const RNRedux = () => (
    <Provider store={store}>
        <Router />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
// AppRegistry.registerComponent(appName, () => Router);

// AppRegistry.registerComponent(appName, () => App);

// import { AppRegistry } from 'react-native';
// import React from 'react';
// import App from './App';
// import { name as appName } from './app.json';
// import { Provider } from 'react-redux';

// import configureStore from './src/store/configureStore';

// const store = configureStore()

// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

// AppRegistry.registerComponent(appName, () => RNRedux);
