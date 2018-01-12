import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import websocket from './websocket';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const middleware = [
  thunkMiddleware.withExtraArgument({ emit: websocket.emit }),
];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware, loggerMiddleware)),
  );
  websocket.init(store);
  return store;
}
