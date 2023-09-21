import CustomTextField from '../common/TextField';
import CustomizedSelect from '../common/Select';
import BasicDatePicker from '../common/DateTimePicker';
import ButtonCustomized from '../common/Button';
import { MeetingType_I } from '../../interfaces/meetingType';
import { Locations_I } from '../../interfaces/locations';

import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import api from '../../services/api';
import classes from './newMinutesForm.module.css';
import TextArea from '../common/TextArea';

export default function NewMinutesForm() {
  const [locationsData, setLocationsData] = useState<Locations_I[]>([]);
  const [meetingTypeData, setMeetingTypeData] = useState<MeetingType_I[]>([]);
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType_I | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedType, setSelectedType] = useState<number | undefined>(undefined);

  /* Controle de campos obrigatórios */
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorStartDate, setErrorStartDate] = useState(false);
  const [errorSelectedType, setErrorSelectedType] = useState(false);
  const [errorSelectedLocation, setErrorSelectedLocation] = useState(false);

  /* Campos dinâmicos */
  const [textAreaValues, setTextAreaValues] = useState<Record<number, string>>({});
  const [dateTimeValues, setDateTimeValues] = useState<Record<number, Dayjs | null>>({});
  const [textValues, setTextValues] = useState<Record<number, string>>({});

  const navigate = useNavigate();

  function navigateToHome() {
    navigate('/');
  }

  async function getLocations() {
    try {
      const response = await api.get('/Locais');
      setLocationsData(response.data as Locations_I[]);
    } catch (error) {
      console.error('Error in GET request:', error);
    }
  }

  async function getMeetingType() {
    try {
      const response = await api.get('/TiposReuniao');
      setMeetingTypeData(response.data as MeetingType_I[]);
    } catch (error) {
      console.error('Error in GET request:', error);
    }
  }

  async function getMeetingTypeById() {
    setIsLoading(true);
    try {
      const response = await api.get(`/TiposReuniao/${selectedType}`);
      setSelectedMeetingType(response.data as MeetingType_I);
    } catch (error) {
      console.error('Error in GET request:', error);
    } finally {
      setIsLoading(false);
    }
  }

  /* Campos dinâmicos */
  function handleTextAreaChange(campoId: number, value: string) {
    setTextAreaValues((prevValues) => ({
      ...prevValues,
      [campoId]: value,
    }));
  }

  function handleDateTimeChange(campoId: number, value: Dayjs | null) {
    setDateTimeValues((prevValues) => ({
      ...prevValues,
      [campoId]: value,
    }));
  }

  function handleTextChange(campoId: number, value: string) {
    setTextValues((prevValues) => ({
      ...prevValues,
      [campoId]: value,
    }));
  }

  useEffect(() => {
    getLocations();
    getMeetingType();
  }, []);

  useEffect(() => {
    if (selectedType !== undefined) {
      getMeetingTypeById();
    }
  }, [selectedType]);

  function renderMeetingFields() {
    if (isLoading) {
      return <p className={classes.text}>Carregando...</p>;
    }

    if (!selectedMeetingType || !selectedMeetingType.campos) {
      return null;
    }

    return selectedMeetingType.campos.map((campo) => {
      if (campo.tipo === 'textarea') {
        return (
          <div>
            <p key={campo.id} className={classes.textAreaTitle}>{campo.nome}</p>
            <div style={{ height: '190px', marginBottom: '30px' }}>
              <TextArea
                value={textAreaValues[campo.id]}
                onChange={(value) => handleTextAreaChange(campo.id, value)}
              />
            </div>
          </div>
        );
      } else if (campo.tipo === 'datetime') {
        return (
          <div className={classes.dinamicDateInput}>
            <div>
              <BasicDatePicker
                key={campo.id}
                label={campo.nome}
                value={dateTimeValues[campo.id] || null}
                onChange={(value) => handleDateTimeChange(campo.id, value)}
              />
            </div>
          </div>
        );
      } else if (campo.tipo === 'text') {
        return (
          <CustomTextField
            key={campo.id}
            label={campo.nome}
            value={textValues[campo.id] || ''}
            onChange={(value) => {
              if (value !== undefined) {
                handleTextChange(campo.id, value);
              }
            }}
          />
        );
      } else {
        return null;
      }
    });
  }

  function clearDynamicFields() {
    setTextAreaValues({});
    setDateTimeValues({});
    setTextValues({});
  }

  function validateFields() {
    let isValid = true;
    console.log(title)
    if (!title) {
      setErrorTitle(true);
      isValid = false;
    } else {
      setErrorTitle(false);
    }

    if (!startDate) {
      setErrorStartDate(true);
      isValid = false;
    } else {
      setErrorStartDate(false);
    }

    if (!selectedType) {
      setErrorSelectedType(true);
      isValid = false;
    } else {
      setErrorSelectedType(false);
    }

    if (!selectedLocation) {
      setErrorSelectedLocation(true);
      isValid = false;
    } else {
      setErrorSelectedLocation(false);
    }

    return isValid;
  }

  async function handleSaveButtonClick() {
    if (!validateFields()) {
      return;
    }

    const camposAtaReuniao: { campoId: number; valor: string }[] = [];

    if (selectedMeetingType && selectedMeetingType.campos) {
      selectedMeetingType.campos.forEach((campo) => {
        const campoId = campo.id;
        let valor = '';

        if (campo.tipo === 'textarea') {
          valor = textAreaValues[campoId] || '';
        } else if (campo.tipo === 'datetime') {
          valor = dateTimeValues[campoId]?.format('YYYY-MM-DDTHH:mm:ss.SSS') ?? '';
        } else if (campo.tipo === 'text') {
          valor = textValues[campoId] || '';
        }

        camposAtaReuniao.push({
          campoId,
          valor,
        });
      });
    }

    const postData: {
      titulo: string;
      dataInicio: string;
      tipoReuniaoId: number;
      localId: number;
      dataFim?: string;
      camposAtaReuniao: { campoId: number; valor: string; }[];
    } = {
      titulo: title || '',
      dataInicio: startDate?.format('YYYY-MM-DDTHH:mm:ss.SSS') || '',
      tipoReuniaoId: selectedType || 0,
      localId: selectedLocation || 0,
      camposAtaReuniao,
    };

    if (endDate !== null) {
      postData.dataFim = endDate.format('YYYY-MM-DDTHH:mm:ss.SSS');
    }
    console.log(postData);

    try {
      const response = await api.post('/Atas', postData);
      console.log('Requisição POST bem-sucedida:', response.data);
      navigateToHome();
    } catch (error) {
      console.error('Erro na requisição POST:', error);
    }
  }

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>Identificação</h1>
        <div className={classes.textFieldContainer}>
          <div>
            <CustomTextField
              label="Titulo"
              required
              value={title}
              onChange={setTitle}
            />
            {errorTitle ? <p className={classes.error}>Campo obrigatório</p> : ''}
          </div>
          <div>
            <CustomizedSelect<Locations_I>
              label="Local"
              required
              options={locationsData}
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
            {errorSelectedLocation ? <p className={classes.error}>Campo obrigatório</p> : ''}
          </div>
          <div>
            <div className={classes.dateInput}>
              <BasicDatePicker
                label="Data e Horário de Início"
                required
                value={startDate}
                onChange={setStartDate}
              />

              <BasicDatePicker
                label="Data e Horário de Fim"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
            {errorStartDate ? <p className={classes.error}>Campo obrigatório</p> : ''}
          </div>
          <div>
            <CustomizedSelect<MeetingType_I>
              label="Tipo de Reunião"
              required
              options={meetingTypeData}
              value={selectedType}
              onChange={(newValue) => {
                clearDynamicFields();
                setSelectedType(newValue);
                getMeetingTypeById()
              }}
            />
            {errorSelectedType ? <p className={classes.error}>Campo obrigatório</p> : ''}
          </div>
        </div>
        <div className={classes.marginTop}>
          <h1 className={classes.title}>Conteúdo da Reunião</h1>
          <div className={`${classes.textFieldContainer} ${classes.marginBottom}`}>
            {selectedType === undefined ? (
              <div className={classes.emptyType}>
                <p >Selecione o tipo de reunião</p>
              </div>
            )
              : renderMeetingFields()}
          </div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <ButtonCustomized
          title="CANCELAR"
          color="gray"
          onClick={navigateToHome}
        />
        <ButtonCustomized
          title="SALVAR ATA"
          color="green"
          onClick={handleSaveButtonClick}
        />
      </div>
    </div >
  )
}
