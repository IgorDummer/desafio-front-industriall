import classes from './minuteCard.module.css';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

interface MinuteCardProps {
  id: number,
  title: string,
  initDate: string,
  local: string,
}

export default function MinuteCard({ id, title, initDate, local }: MinuteCardProps) {

  return (
    <div className={classes.conteiner}>
      <div className={classes.text}>
        <h1>{title}</h1>
        <p>{initDate}, na {local}</p>
      </div>
      <div>
        <VisibilityOutlinedIcon className={classes.icon} style={{ marginRight: "16px" }} />
        <DeleteOutlineIcon className={classes.icon} />
      </div>
    </div>
  )
}