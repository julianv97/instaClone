import {Action} from '@customTypes/redux';
import {IInitialStateUsers} from '@interfaces/index';

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
} from './constants';

const initialState: IInitialStateUsers = {
  usersSearch: [],
  followedUser: '',
  unfollowUser: '',
  isLoading: false,
  isError: false,
};

const usersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SEARCH_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_USERS_FULLFILLED:
      return {
        ...state,
        usersSearch: action.payload,
        isLoading: false,
      };
    case SEARCH_USERS_REJECTED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case FOLLOW_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FOLLOW_USERS_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        followedUser: action.payload,
      };
    case FOLLOW_USERS_REJECTED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case UNFOLLOW_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case UNFOLLOW_USERS_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        unfollowUser: action.payload,
      };
    case UNFOLLOW_USERS_REJECTED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
