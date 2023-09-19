/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpinnerAnimation } from './spinner';
import { useState } from 'react';

import classes from "./button.module.css";

interface Props {
  color: "green" | "orange" | "gray",
  onClick?: () => void,
  children: React.ReactNode,
  disabled?: boolean,
  loading?: boolean,
  form?: string,
  type?: "button" | "submit" | "reset" | undefined,
  isNewMinute?: boolean,
}

const Button: React.FC<Props> = ({
  color,
  onClick,
  children,
  disabled,
  loading,
  form,
  type,
  isNewMinute
}: Props) => {
  const [haveIcon] = useState(isNewMinute ? true : false);
  return (
    <button
      disabled={disabled}
      className={classes.buttonFont + " " + classes[color]}
      onClick={(e: any) => {
        if (!loading && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      form={form}
      type={type}
    >
      {haveIcon ? <img src="addIcon.svg" alt="add" /> : ""}
      {children}
      {loading ? <SpinnerAnimation /> : ""}
    </button>
  )
}

export default Button;
