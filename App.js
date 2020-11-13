/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { Provider } from 'react-redux';
import React from 'react';
import AppContainer from './src/navigation/AppNavigation';
import { StatusBar } from 'react-native';
import store from './src/redux/store';

console.disableYellowBox = true;


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
      <StatusBar translucent={false} backgroundColor={"#ECECEC"} barStyle={"dark-content"}/>
    </Provider>
  );
};

export default App;
