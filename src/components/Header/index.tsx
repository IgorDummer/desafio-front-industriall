import { useState } from 'react';

import classes from "./header.module.css"
import CustomButton from '../common/Button';

interface HeaderProps {
  title: string;
  subtitle: string;
  hasButton?: boolean;
}


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
        {buttonNewMinutes && (
          <div>
            <CustomButton
              title="NOVA ATA"
              color="orange"
            />
          </div>
        )}
      </div>
    </div>
  )
}
