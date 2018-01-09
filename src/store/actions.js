import { DUMMY_TOKEN_ADDR, TICKER_INVALID_INTERVAL } from '../config';
import websocket from './websocket';

export const REQUEST_TICKER = 'REQUEST_TICKER';
function requestTicker() {
  return {
    type: REQUEST_TICKER,
    date: new Date(),
  };
}

function shouldFetchTicker(state) {
  const { ticker } = state;
  return (
    !ticker.lastUpdated ||
    new Date().getTime() - ticker.lastUpdated.getTime() >=
      TICKER_INVALID_INTERVAL
  );
}

export function fetchTicker() {
  return dispatch => {
    dispatch(requestTicker());
    websocket.emit('getMarket', { token: DUMMY_TOKEN_ADDR });
  };
}

export function fetchTickerIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTicker(getState())) {
      dispatch(fetchTicker());
    }
  };
}
