import {IInitialStateAuth} from '../../interfaces';
import {Action} from '../../types/redux';
import {
  SET_REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_FULLFILLED,
} from './constants';

const initialState: IInitialStateAuth = {
  currentUser: {
    email: '',
  },
  authenticated: false,
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
        authenticated: true,
        currentUser: {
          email: action.payload.email,
        },
      };
    case LOGIN_FULLFILLED:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
