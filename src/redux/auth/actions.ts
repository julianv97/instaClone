import firebase from 'firebase/compat';
import {IRegisterData, ILoginData} from '@interfaces/index';
import {
  REGISTER_USER_FULLFILLED,
  REGISTER_USER_PENDING,
  REGISTER_USER_REJECTED,
  SET_CURRENT_USER,
  LOGIN_FULLFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGOUT_FULLFILLED,
  LOGOUT_PENDING,
  LOGOUT_REJECTED,
} from './constants';

export const setCurrentUser = (
  data: firebase.firestore.DocumentData | undefined,
) => ({
  type: SET_CURRENT_USER,
  payload: data,
});

export const registerUserFullFill = (data: IRegisterData) => ({
  type: REGISTER_USER_FULLFILLED,
  payload: data,
});

export const registerUserPending = () => ({
  type: REGISTER_USER_PENDING,
});

export const registerUserRejected = () => ({
  type: REGISTER_USER_REJECTED,
});

export const setLoginUserFullfill = (data: ILoginData) => ({
  type: LOGIN_FULLFILLED,
  payload: data,
});

export const setLoginUserPending = () => ({
  type: LOGIN_PENDING,
});

export const setLoginUserRejected = () => ({
  type: LOGIN_REJECTED,
});

export const setLogoutUserFullfill = () => ({
  type: LOGOUT_FULLFILLED,
});

export const setLogoutUserPending = () => ({
  type: LOGOUT_PENDING,
});

export const setLogoutUserRejected = () => ({
  type: LOGOUT_REJECTED,
});
