import React from 'react';
import { AnchorButton, PopoverInteractionKind } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/labs';

import PairsTable from './PairsTable';

function PairsPopover({ pairs, lastUpdated }) {
  return (
    <Popover2
      inline={false}
      interactionKind={PopoverInteractionKind.CLICK}
      content={<PairsTable pairs={pairs} lastUpdated={lastUpdated} />}
      placement="bottom-start"
      popoverClassName="pairs-popover">
      <AnchorButton rightIconName="caret-down" text="Trading Pairs" />
    </Popover2>
  );
}

export default PairsPopover;
