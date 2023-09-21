import CustomTextField from '../common/TextField';
import BasicDatePicker from '../common/DateTimePicker';
import ButtonCustomized from '../common/Button';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import api from '../../services/api';
import classes from './minuteViewer.module.css';
import { MeetingMinutes_I } from '../../interfaces/atas';
import dayjs from 'dayjs';
import TextArea from '../common/TextArea';

interface MinuteViewerProps {
  id: string,
}

export default function MinuteViewer({ id }: MinuteViewerProps) {
  const [ata, setAta] = useState<MeetingMinutes_I>();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function navigateToHome() {
    navigate('/');
  }

  /* Requisição GET da ata */
  async function getMinuteData() {
    setIsLoading(true);
    try {
      const response = await api.get(`/Atas/${id}`);
      setAta(response.data as MeetingMinutes_I);
    } catch (error) {
      console.error('Error in GET request:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMinuteData()
  }, []);

  /* Conversão da data */
  function parseDate(dateString: string | null): Dayjs | null {
    if (!dateString) return null;
    return dayjs(dateString);
  }

  function renderMeetingFields() {
    if (!ata || !ata.camposAtaReuniao) {
      return null;
    }

    /* Faz um map de todos os campos e renderiza de acordo com seu tipo */
    return ata.camposAtaReuniao.map((campo) => {
      if (campo.tipo === 'textarea') {
        return (
          <div>
            {
              campo.valor !== '' && (
                <div style={{ height: '190px', marginBottom: '30px' }}>
                  <p key={campo.id} className={classes.textAreaTitle} > {campo.nome}</p>
                  <TextArea
                    key={campo.id}
                    value={campo.valor}
                    onChange={() => { }}
                    readOnly
                  />
                </div>
              )
            }
          </div>
        );
      } else if (campo.tipo === 'text') {
        return (
          <div>
            {
              campo.valor !== '' && (
                <div key={campo.id}>
                  <p className={classes.textAreaTitle}>{campo.nome}</p>
                  <CustomTextField
                    key={campo.id}
                    label={''}
                    value={campo.valor}
                  />
                </div>
              )
            }
          </div>
        );
      } else if (campo.tipo === 'datetime') {
        return (
          <div>
            {
              campo.valor !== '' && (
                <div key={campo.id}>
                  <p className={classes.textAreaTitle}>{campo.nome}</p>
                  <BasicDatePicker
                    label=""
                    value={parseDate(campo.valor)}
                  />
                </div>
              )
            }
          </div>
        );
      }
      else {
        return null;
      }
    });
  }


  return (
    <div className={classes.container}>
      {isLoading && <p className={classes.text}>Carregando...</p>}
      {ata && (
        <div>
          <h1 className={classes.title}>Identificação</h1>
          <div className={classes.textFieldContainer}>
            <CustomTextField
              label="Titulo"
              value={ata.titulo}
              readOnly
            />
            <CustomTextField
              label="Local"
              value={ata.local}
              readOnly
            />
            <div>
              <div className={classes.dateInput}>
                <BasicDatePicker
                  label="Data de Início"
                  value={parseDate(ata.dataInicio)}
                  readOnly
                />
                {ata.dataFim && (
                  <BasicDatePicker
                    label="Data de Fim"
                    value={parseDate(ata.dataFim)}
                    readOnly
                  />
                )}
              </div>
            </div>
            <CustomTextField
              label="Tipo de Reunião"
              value={ata.tipoReuniao}
              readOnly
            />
          </div>
          <div className={classes.marginTop}>
            <h1 className={classes.title}>Conteúdo da Reunião</h1>
            <div className={`${classes.textFieldContainer} ${classes.marginBottom}`}>
              {ata.camposAtaReuniao.length === undefined ?
                (
                  <div className={classes.emptyType}>
                    <p >Selecione o tipo de reunião</p>
                  </div>
                )
                : renderMeetingFields()}
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <ButtonCustomized color={'green'} title={'Voltar'} onClick={navigateToHome} />
          </div>
        </div>

      )}
    </div>
  )
}