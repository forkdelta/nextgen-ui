export const UPDATE_WEBSOCKET_STATUS = 'UPDATE_WEBSOCKET_STATUS';
export function updateWebsocketStatus(status) {
  return { type: UPDATE_WEBSOCKET_STATUS, status };
}
