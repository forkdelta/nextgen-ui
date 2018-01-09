import { combineReducers } from 'redux';

import { REQUEST_TICKER } from './actions';
import { ACTIONS as WS_ACTIONS } from './websocket';

function websocket(state = { status: 'unknown' }, action) {
  switch (action.type) {
    case WS_ACTIONS.WS_CONNECT:
      return { ...state, status: 'connected' };
    case WS_ACTIONS.WS_DISCONNECT:
      return { ...state, status: 'disconnected' };
    default:
      return state;
  }
}

function ticker(state = { lastRequested: null, lastUpdated: null }, action) {
  switch (action.type) {
    case REQUEST_TICKER:
      return { ...state, lastRequested: action.date };
    case WS_ACTIONS.WS_MARKET:
      if (!!action.payload.returnTicker) {
        return {
          ...state,
          lastUpdated: action.date,
          data: action.payload.returnTicker,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  websocket,
  ticker,
});

export default rootReducer;
