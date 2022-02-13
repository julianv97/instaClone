import React from 'react';
import MainStack from './src/navigation/MainStack';

import {initializeApp} from 'firebase/app';

import Config from 'react-native-config';

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = Config;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export default function App(): JSX.Element {
  return <MainStack />;
}
