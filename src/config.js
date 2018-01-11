const DUMMY_TOKEN_ADDR = '0x0000000000000000000000000000000000000000';
const ED_WEBSOCKETS = [
  'https://socket01.etherdelta.com',
  'https://socket02.etherdelta.com',
  'https://socket03.etherdelta.com',
  'https://socket04.etherdelta.com',
  'https://socket05.etherdelta.com',
  'https://socket06.etherdelta.com',
];
const ED_WEBSOCKET =
  ED_WEBSOCKETS[Math.floor(Math.random() * ED_WEBSOCKETS.length)];
const ED_WEBSOCKET_TIMEOUT = 10000;
const TICKER_UPDATE_INTERVAL = 10000,
  TICKER_INVALID_INTERVAL = 10000;
const TOKENS_URL = `${process.env.PUBLIC_URL}/tokens.json`;

export {
  DUMMY_TOKEN_ADDR,
  ED_WEBSOCKET,
  ED_WEBSOCKET_TIMEOUT,
  TICKER_UPDATE_INTERVAL,
  TICKER_INVALID_INTERVAL,
  TOKENS_URL,
};
