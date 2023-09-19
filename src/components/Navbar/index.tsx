import React from 'react';

import classes from "./Navbar.module.css"

const Navbar: React.FC = () => {
  return (
    <div className={classes.navbar}>
      <a href="https://industriall.ai/">
        <img src="IndustriAll.svg" alt="IndustriAll" />
      </a>
    </div>
  );
};

export default Navbar;