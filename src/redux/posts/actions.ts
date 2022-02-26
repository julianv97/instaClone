import {
  SAVE_POST_FULLFILLED,
  SAVE_POST_PENDING,
  SAVE_POST_REJECTED,
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
