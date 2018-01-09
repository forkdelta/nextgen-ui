import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import websocket from './websocket';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const middleware = [
  thunkMiddleware.withExtraArgument({ emit: websocket.emit }),
];

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware, loggerMiddleware)
  );
  websocket.init(store);
  return store;
}
