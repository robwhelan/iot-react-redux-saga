import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import connect from './sagas';
// Logger with default options
import logger from "redux-logger";

import websocketReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();


export default function configureStore(initialState) {
  let store = {};

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let createStoreWithMiddleware = composeEnhancers(
      applyMiddleware(sagaMiddleware, logger)
  )(createStore);

  store = createStoreWithMiddleware(websocketReducer, initialState);

  sagaMiddleware.run(connect);

  return store;
}
