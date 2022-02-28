import {IPost} from '@interfaces/index';
import {
  SAVE_POST_FULLFILLED,
  SAVE_POST_PENDING,
  SAVE_POST_REJECTED,
  GET_POSTS_FULLFILLED,
  GET_POSTS_PENDING,
  GET_POSTS_REJECTED,
} from './constants';

export const savePostFullFill = () => ({
  type: SAVE_POST_FULLFILLED,
});

export const savePostPending = () => ({
  type: SAVE_POST_PENDING,
});

export const savePostRejected = () => ({
  type: SAVE_POST_REJECTED,
});

export const getPostFullfill = (data: IPost[]) => ({
  type: GET_POSTS_FULLFILLED,
  payload: data,
});

export const getPostPending = () => ({
  type: GET_POSTS_PENDING,
});

export const getPostRejected = () => ({
  type: GET_POSTS_REJECTED,
});
