import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import auth from './auth/reducer';
import posts from './posts/reducer';

const reducers = combineReducers({
  auth,
  posts,
});

const enhancers = [];

enhancers.push(applyMiddleware(thunk));

const store = createStore(reducers, compose(...enhancers));

export type RootState = ReturnType<typeof store.getState>;

export default store;
