import { useState, useEffect } from 'react';

import classes from "./header.module.css"
import Button from '../common/Button';

export default function Header({ title, subtitle, hasButton }: HeaderProps) {
  const [buttonNewMinutes] = useState(hasButton ? true : false);

  function toggleButton() {
    console.log(buttonNewMinutes)
  }
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.subtitle}>{subtitle}</p>
        </div>
        <div>
          <Button color="orange"
            onClick={toggleButton}
            isNewMinute>NOVA ATA</Button>
        </div>
      </div>
    </div>
  )
}
