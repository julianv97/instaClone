import {IInitialStateAuth} from '@interfaces/index';
import {Action} from '../../customTypes/redux';
import {
  REGISTER_USER_FULLFILLED,
  SET_CURRENT_USER,
  LOGIN_FULLFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGOUT_FULLFILLED,
  LOGOUT_PENDING,
  LOGOUT_REJECTED,
} from './constants';

const initialState: IInitialStateAuth = {
  currentUser: {
    email: '',
    name: '',
  },
  authenticated: false,
  isLoading: false,
  isError: false,
};

const authReducer = (
  state = initialState,
  action: Action,
): IInitialStateAuth => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case REGISTER_USER_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };

    case LOGIN_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
        },
      };
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
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
