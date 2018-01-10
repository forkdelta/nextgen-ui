import React from 'react';
import {
  Navbar as BlueprintNavbar,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

import './Navbar.css';

function Navbar() {
  return (
    <BlueprintNavbar className="pt-fixed-top pt-dark">
      <NavbarGroup>
        <NavbarHeading id="brand-name">
          Fork
          <strong>Delta</strong>
        </NavbarHeading>
      </NavbarGroup>
    </BlueprintNavbar>
  );
}

export default Navbar;
