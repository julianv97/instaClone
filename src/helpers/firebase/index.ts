import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

import Config from 'react-native-config';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

export const tokenListener = () => {
  // Every time the token change, it is saved on sessionStorage
  firebase.auth().onIdTokenChanged(async user => {
    if (user) {
      const token = await user.getIdToken();
      AsyncStorage.setItem('token', token);
    }
  });
};

export default firebaseApp;
