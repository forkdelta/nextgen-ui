import { combineReducers } from 'redux';

import { UPDATE_WEBSOCKET_STATUS } from './actions';

function websocket(state = { status: 'unknown' }, action) {
  switch (action.type) {
    case UPDATE_WEBSOCKET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  websocket,
});

export default rootReducer;
