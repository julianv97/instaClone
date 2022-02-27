import {IInitialStatePosts} from '@interfaces/index';
import {Action} from '@customTypes/redux';
import {
  SAVE_POST_FULLFILLED,
  SAVE_POST_PENDING,
  SAVE_POST_REJECTED,
} from './constants';

const initialState: IInitialStatePosts = {
  imageToUpload: '',
  isLoading: false,
  isError: false,
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

    default:
      return state;
  }
};

export default postsReducer;
