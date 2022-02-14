import {Action} from '../../types/redux';
import {SET_REGISTER_USER, SET_CURRENT_USER} from './constants';

const initialState = {
  currentUser: null,
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_REGISTER_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
