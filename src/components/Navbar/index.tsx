import React from 'react';

import classes from "./Navbar.module.css"

const Navbar: React.FC = () => {
  return (
    <div className={classes.navbar}>
      <img src="IndustriAll.svg" alt="IndustriAll" />
    </div>
  );
};

export default Navbar;