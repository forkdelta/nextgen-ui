import { isEmpty } from 'lodash';

import {
  DUMMY_TOKEN_ADDR,
  TICKER_INVALID_INTERVAL,
  TOKENS_URL,
} from '../config';
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

export const REQUEST_TOKEN_LIST = 'REQUEST_TOKEN_LIST';
function requestTokensList() {
  return {
    type: REQUEST_TOKEN_LIST,
    date: new Date(),
  };
}

export const RECEIVE_TOKEN_LIST = 'RECEIVE_TOKEN_LIST';
function receiveTokensList(tokensList) {
  return {
    type: RECEIVE_TOKEN_LIST,
    date: new Date(),
    list: tokensList,
  };
}

function shouldFetchTokensList(state) {
  const { tokens } = state;
  return isEmpty(tokens.data) && !tokens.isFetching;
}

export function fetchTokensList() {
  return dispatch => {
    dispatch(requestTokensList());

    fetch(TOKENS_URL)
      .then(response => response.json())
      .then(responseJSON => dispatch(receiveTokensList(responseJSON)));
    // TODO: Error handling
  };
}

export function fetchTokensListIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTokensList(getState())) {
      dispatch(fetchTokensList());
    }
  };
}
