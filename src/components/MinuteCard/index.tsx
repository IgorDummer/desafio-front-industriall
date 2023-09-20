import classes from './minuteCard.module.css';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import React from 'react';
import BasicModal from '../common/Modal/modal';

import api from '../../services/api';

interface MinuteCardProps {
  id: number,
  title: string,
  initDate: string,
  local: string,
  onDeleteSuccess: () => void;
}

export default function MinuteCard({ id, title, initDate, local, onDeleteSuccess }: MinuteCardProps) {
  const [deleteButton, setDeleteButton] = React.useState(false);
  const [visibilityButton, setVisibilityButton] = React.useState(false);

  async function deleteMinute() {
    try {
      const response = await api.delete(`/Atas/${id}`);
      console.log(response.data);
      toggleDeleteButton();
      onDeleteSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  function toggleDeleteButton() {
    setDeleteButton(!deleteButton)
  }

  function toggleVisibilityButton() {
    setVisibilityButton(!visibilityButton)
  }

  return (
    <div className={classes.conteiner}>
      <div className={classes.text}>
        <h1>{title}</h1>
        <p>{initDate}, na {local}</p>
      </div>
      <div>
        <VisibilityOutlinedIcon className={classes.icon} style={{ marginRight: "16px" }} onClick={toggleVisibilityButton} />
        <DeleteOutlineIcon className={classes.icon} onClick={toggleDeleteButton} />
        {deleteButton && (
          <BasicModal minute={title}
            deleteMinute={deleteMinute}
            handleClose={toggleDeleteButton} open={deleteButton} />
        )}
      </div>
    </div>
  )
}