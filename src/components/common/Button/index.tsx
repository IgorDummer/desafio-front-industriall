import React from 'react';
import Button from '@mui/material/Button';
import classes from './button.module.css';
import { styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ButtonProps {
  title: string;
  color: "orange" | "gray" | "green";
  onClick?: () => void;
}

// Crie um componente estilizado personalizado para cada cor
const OrangeButton = styled(Button)`
  font-family: Calibri, sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 5px 13px;
  border-radius: 5px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  heigh: auto;
  gap: 10px;
  background-color: #FF4F2A; // Cor laranja
  color: #F5F5F5; // Cor do texto branca

  &:hover {
    background-color: #FF4F2A;
  }
`;

const GrayButton = styled(Button)`
  font-family: Calibri, sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 5px 13px;
  border-radius: 5px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  heigh: auto;
  gap: 10px;
  background-color: #C0C1C6; // Cor cinza
  color: #5C5958; // Cor do texto preta

  &:hover {
    background-color: #C0C1C6;
  }
`;

const GreenButton = styled(Button)`
  font-family: Calibri, sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 5px 13px;
  border-radius: 5px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  heigh: auto;
  gap: 10px;
  background-color: #4CAF50; // Cor verde
  color: #E4E6F0; // Cor do texto branca

  &:hover {
    background-color: #4CAF50;
  }
`;

const iconStyle = {
  fontSize: 'medium',
  color: '#F5F5F5'
};

export default function ButtonCustomized({ title, color, onClick }: ButtonProps) {
  let CustomButton;
  const [haveIcon] = React.useState(color === 'orange' ? true : false);

  switch (color) {
    case "orange":
      CustomButton = OrangeButton;
      break;
    case "gray":
      CustomButton = GrayButton;
      break;
    case "green":
      CustomButton = GreenButton;
      break;
    default:
      CustomButton = OrangeButton;
  }

  return (
    <CustomButton variant="contained" className={classes.buttonFont} onClick={onClick}>
      {haveIcon && <AddIcon style={iconStyle} />}
      {title}
    </CustomButton >
  );
}
