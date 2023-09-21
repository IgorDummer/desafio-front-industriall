import React from 'react';
import dayjs from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import BasicModal from '../common/Modal/modal';

import api from '../../services/api';
import classes from './minuteCard.module.css';
import { useNavigate } from 'react-router-dom';

interface MinuteCardProps {
  id: number,
  title: string,
  initDate: string,
  local: string,
  onDeleteSuccess: () => void;
}

export default function MinuteCard({ id, title, initDate, local, onDeleteSuccess }: MinuteCardProps) {
  const [deleteButton, setDeleteButton] = React.useState(false);

  const navigate = useNavigate();

  /* Faz a conversão proposta */
  function formatDate(dateString: string): string {
    const date = dayjs(dateString);
    return date.format('DD/MM/YYYY [às] HH:mm');
  }

  /* Requisição DELETE para a api */
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

  function handleVisibilityButton() {
    navigate(`/ata/${id}`)
  }

  return (
    <div className={classes.conteiner}>
      <div className={classes.text}>
        <h1>{title}</h1>
        <p>{formatDate(initDate)}, na {local}</p>
      </div>
      <div>
        <VisibilityOutlinedIcon className={classes.icon} style={{ marginRight: "16px" }} onClick={handleVisibilityButton} />
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