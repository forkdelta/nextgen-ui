import io from 'socket.io-client';

import { ED_WEBSOCKET, ED_WEBSOCKET_TIMEOUT } from '../config';

const socket = io(ED_WEBSOCKET, {
  transports: ['websocket'],
  timeout: ED_WEBSOCKET_TIMEOUT,
  autoConnect: false,
});

const MESSAGE_TYPES = {
  WS_CONNECT: 'connect',
  WS_DISCONNECT: 'disconnect',
  WS_FUNDS: 'funds',
  WS_MARKET: 'market',
  WS_ORDERS: 'orders',
  WS_TRADES: 'trades',
};

export const ACTIONS = Object.keys(MESSAGE_TYPES).reduce((memo, key) => {
  memo[key] = key;
  return memo;
}, {});

const init = store => {
  Object.keys(ACTIONS).forEach(type =>
    socket.on(MESSAGE_TYPES[type], payload =>
      store.dispatch({ type, date: new Date(), payload })
    )
  );
  socket.connect();
};

const emit = (type, payload) => socket.emit(type, payload);
export default { init, emit };
