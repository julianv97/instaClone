import firebase from 'firebase/compat';
import {IRegisterData} from '../../interfaces';
import {
  SET_REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_FULLFILLED,
} from './constants';

export const setCurrentUser = (
  data: firebase.firestore.DocumentData | undefined,
) => ({
  type: SET_CURRENT_USER,
  payload: data,
});

export const setRegisterUser = (data: IRegisterData) => ({
  type: SET_REGISTER_USER,
  payload: data,
});

export const setLoginUser = () => ({
  type: LOGIN_FULLFILLED,
  payload: null,
});
