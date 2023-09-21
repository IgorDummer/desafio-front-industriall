import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "./header.module.css"
import ButtonCustomized from '../common/Button';

interface HeaderProps {
  title: string;
  subtitle: string;
  hasButton?: boolean;
}

export default function Header({ title, subtitle, hasButton, onClick }: HeaderProps) {
  const [buttonNewMinutes] = useState(hasButton ? true : false);

  const navigate = useNavigate();

  function handleButtonClick() {
    navigate('/new-meeting-minutes');
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
            <ButtonCustomized
              title="NOVA ATA"
              color="orange"
              onClick={handleButtonClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}
