import React, {useEffect} from 'react';
import MainStack from './src/navigation/MainStack';

import {tokenListener} from './src/helpers/firebase';

import {Provider} from 'react-redux';
import store from './src/redux';

export default function App(): JSX.Element {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
