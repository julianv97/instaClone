import React from 'react';
import MainStack from './src/navigation/MainStack';

import {Provider} from 'react-redux';
import store from './src/redux';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
