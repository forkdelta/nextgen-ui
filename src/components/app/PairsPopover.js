import React from 'react';
import { AnchorButton, PopoverInteractionKind } from '@blueprintjs/core';

import PairsTable from './PairsTable';
import PopoverBlockingScroll from '../common/PopoverBlockingScroll';

function PairsPopover({ pairs, lastUpdated }) {
  return (
    <PopoverBlockingScroll
      content={<PairsTable pairs={pairs} lastUpdated={lastUpdated} />}
      inline={false}
      interactionKind={PopoverInteractionKind.CLICK}
      placement="bottom-start"
      popoverClassName="pairs-popover">
      <AnchorButton rightIconName="caret-down" text="Trading Pairs" />
    </PopoverBlockingScroll>
  );
}

export default PairsPopover;
