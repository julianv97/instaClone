import {
  SEARCH_USERS_FULLFILLED,
  SEARCH_USERS_PENDING,
  SEARCH_USERS_REJECTED,
  FOLLOW_USERS_FULLFILLED,
  FOLLOW_USERS_PENDING,
  FOLLOW_USERS_REJECTED,
} from './constants';

export const searchUsersFullFill = (data: any) => ({
  type: SEARCH_USERS_FULLFILLED,
  payload: data,
});

export const searchUsersPending = () => ({
  type: SEARCH_USERS_PENDING,
});

export const searchUsersRejected = () => ({
  type: SEARCH_USERS_REJECTED,
});

export const followUsersFullFill = (data: any) => ({
  type: FOLLOW_USERS_FULLFILLED,
  payload: data,
});

export const followUsersPending = () => ({
  type: FOLLOW_USERS_PENDING,
});

export const followUsersRejected = () => ({
  type: FOLLOW_USERS_REJECTED,
});
