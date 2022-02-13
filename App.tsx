import React, {useEffect} from 'react';
import MainStack from './src/navigation/MainStack';

import {tokenListener} from './src/helpers/firebase';

export default function App(): JSX.Element {
  useEffect(() => {
    tokenListener();
  }, []);

  return <MainStack />;
}
