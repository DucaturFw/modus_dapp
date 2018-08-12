import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import tokens from './../reducers/tokens';
import details from './../reducers/details';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
  return createStore(
    combineReducers({
      tokens,
      details
    }),
    {},
    composeEnhancers(applyMiddleware(thunk))
  );
}
