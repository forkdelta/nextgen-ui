import React from 'react';
import { Overlay, Spinner } from '@blueprintjs/core';

import './WebsocketConnectingOverlay.css';

function WebsocketConnectingOverlay({ isOpen }) {
  return (
    <Overlay
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      isOpen={isOpen}>
      <div id="websocketConnectingOverlay" className="pt-card pt-elevation-4">
        <div>
          <Spinner />
        </div>
        <div>Connecting to EtherDelta...</div>
      </div>
    </Overlay>
  );
}

export default WebsocketConnectingOverlay;
