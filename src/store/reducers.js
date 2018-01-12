import { combineReducers } from 'redux';

import {
  REQUEST_TICKER,
  REQUEST_TOKEN_LIST,
  RECEIVE_TOKEN_LIST,
} from './actions';
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

function ticker(
  state = { lastRequested: null, lastUpdated: null, data: {} },
  action
) {
  switch (action.type) {
    case REQUEST_TICKER:
      return { ...state, lastRequested: action.date };
    case WS_ACTIONS.WS_MARKET:
      if (action.payload.returnTicker) {
        const data = Object.values(action.payload.returnTicker).reduce(
          (memo, pair) => {
            memo[pair.tokenAddr] = pair;
            return memo;
          },
          {}
        );
        return {
          ...state,
          lastUpdated: action.date,
          data,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

function tokens(state = { isFetching: false, data: {} }, action) {
  switch (action.type) {
    case REQUEST_TOKEN_LIST:
      return { ...state, isFetching: true };
    case RECEIVE_TOKEN_LIST: {
      const data = action.list.reduce((memo, token) => {
        memo[token.addr] = token;
        return memo;
      }, {});
      return { ...state, isFetching: false, data };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  websocket,
  ticker,
  tokens,
});

export default rootReducer;
