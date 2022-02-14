import firebase from 'firebase/compat';
import {IRegisterData} from '../../interfaces';
import {SET_REGISTER_USER, SET_CURRENT_USER} from './constants';

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
