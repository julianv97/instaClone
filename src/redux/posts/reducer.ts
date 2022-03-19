import {IInitialStatePosts} from '@interfaces/index';
import {Action} from '@customTypes/redux';
import {
  SAVE_POST_FULLFILLED,
  SAVE_POST_PENDING,
  SAVE_POST_REJECTED,
  GET_POSTS_FULLFILLED,
  GET_POSTS_PENDING,
  GET_POSTS_REJECTED,
  LOGOUT_FULLFILLED,
} from './constants';

const initialState: IInitialStatePosts = {
  imageToUpload: '',
  isLoading: false,
  isError: false,
  posts: [],
};

const postsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SAVE_POST_PENDING:
      return {
        ...state,
        IsLoading: true,
      };
    case SAVE_POST_FULLFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case SAVE_POST_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_POSTS_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case GET_POSTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case LOGOUT_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        posts: [],
      };

    default:
      return state;
  }
};

export default postsReducer;
