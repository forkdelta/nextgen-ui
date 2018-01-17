import React from 'react';
import { AnchorButton, PopoverInteractionKind } from '@blueprintjs/core';

import PairsTable from './PairsTable';
import PopoverBlockingScroll from '../common/PopoverBlockingScroll';
import PairsFilterBox from './PairsFilterBox';

function PairsPopover({ pairs, lastUpdated }) {
  return (
    <PopoverBlockingScroll
      content={
        <PairsFilterBox pairs={pairs}>
          <PairsTable lastUpdated={lastUpdated} />
        </PairsFilterBox>
      }
      inline={false}
      interactionKind={PopoverInteractionKind.CLICK}
      placement="bottom-start"
      popoverClassName="pairs-popover">
      <AnchorButton
        title={`Ticker last updated: ${(lastUpdated &&
          lastUpdated.toLocaleTimeString()) ||
          'never'}`}
        rightIconName="caret-down"
        text="Tokens"
      />
    </PopoverBlockingScroll>
  );
}

export default PairsPopover;
