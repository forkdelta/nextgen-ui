import React from 'react';
import {
  Navbar as BlueprintNavbar,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

import PairsPopover from './PairsPopover';

import './Navbar.css';

function Navbar({ pairs, tickerLastUpdated }) {
  return (
    <BlueprintNavbar className="pt-fixed-top pt-dark">
      <NavbarGroup>
        <NavbarHeading id="brand-name">
          Fork
          <strong>Delta</strong>
        </NavbarHeading>
      </NavbarGroup>

      <NavbarGroup>
        <PairsPopover pairs={pairs} lastUpdated={tickerLastUpdated} />
      </NavbarGroup>
    </BlueprintNavbar>
  );
}

export default Navbar;
