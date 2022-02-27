import {IInitialStateAuth} from '@interfaces/index';
import {Action} from '../../customTypes/redux';
import {
  SET_REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_FULLFILLED,
  LOGOUT_FULLFILLED,
  LOGOUT_PENDING,
  LOGOUT_REJECTED,
} from './constants';

const initialState: IInitialStateAuth = {
  currentUser: {
    email: '',
  },
  authenticated: false,
  isLoading: false,
  isError: false,
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

    case LOGOUT_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        currentUser: {
          email: '',
        },
      };
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default authReducer;
