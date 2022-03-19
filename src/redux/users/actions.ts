import {
  SEARCH_USERS_FULLFILLED,
  SEARCH_USERS_PENDING,
  SEARCH_USERS_REJECTED,
  FOLLOW_USERS_FULLFILLED,
  FOLLOW_USERS_PENDING,
  FOLLOW_USERS_REJECTED,
  UNFOLLOW_USERS_FULLFILLED,
  UNFOLLOW_USERS_PENDING,
  UNFOLLOW_USERS_REJECTED,
  GET_USER_FOLLOWINGS_FULLFILLED,
  GET_USER_FOLLOWINGS_PENDING,
  GET_USER_FOLLOWINGS_REJECTED,
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

export const unfollowUsersFullFill = (data: any) => ({
  type: UNFOLLOW_USERS_FULLFILLED,
  payload: data,
});

export const unfollowUsersPending = () => ({
  type: UNFOLLOW_USERS_PENDING,
});

export const unfollowUsersRejected = () => ({
  type: UNFOLLOW_USERS_REJECTED,
});

export const getUserFollowsFullFill = (data: any) => ({
  type: GET_USER_FOLLOWINGS_FULLFILLED,
  payload: data,
});

export const getUserFollowsPending = () => ({
  type: GET_USER_FOLLOWINGS_PENDING,
});

export const getUserFollowsRejected = () => ({
  type: GET_USER_FOLLOWINGS_REJECTED,
});
