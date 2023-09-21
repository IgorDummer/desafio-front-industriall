import Modal from '@mui/material/Modal';
import ButtonCustomized from '../Button';

import classes from './modal.module.css';

interface ModalProps {
  handleClose: () => void;
  deleteMinute: () => void;
  open: boolean;
  minute: string;
}

export default function BasicModal({ handleClose, deleteMinute, open, minute }: ModalProps) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.container}>
          <h1 className={classes.title}>Deseja deletar a ata {minute}?</h1>
          <div className={classes.buttonContainer}>
            <ButtonCustomized color="gray" title="Cancelar" onClick={handleClose} />
            <ButtonCustomized color="green" title="Deletar" onClick={deleteMinute} />
          </div>
        </div>
      </Modal>
    </div>
  );
}