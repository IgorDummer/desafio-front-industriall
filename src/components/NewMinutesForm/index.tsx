import CustomTextField from '../common/TextField';
import CustomizedSelect from '../common/Select';
import BasicDatePicker from '../common/DateTimePicker';

import classes from './newMinutesForm.module.css';
import ButtonCustomized from '../common/Button';
import { useEffect, useState } from 'react';
import { Locations_I } from '../../interfaces/locations';
import api from '../../services/api';
import { MeetingType_I } from '../../interfaces/meetingType';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';

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

  /* Campos dinâmicos */
  const [textAreaValues, setTextAreaValues] = useState<Record<number, string>>({});
  const [dateTimeValues, setDateTimeValues] = useState<Record<number, Dayjs | null>>({});
  const [textValues, setTextValues] = useState<Record<number, string>>({});

  const navigate = useNavigate();

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

  useEffect(() => {
    getLocations();
    getMeetingType();
  }, []);

  useEffect(() => {
    if (selectedType !== undefined) {
      getMeetingTypeById();
    }
  }, [selectedType]);

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

  function renderMeetingFields() {
    if (isLoading) {
      return <p>Carregando campos...</p>;
    }

    if (!selectedMeetingType || !selectedMeetingType.campos) {
      return null;
    }

    return selectedMeetingType.campos.map((campo) => {
      if (campo.tipo === 'textarea') {
        return (
          <div>
            <p key={campo.id} className={classes.textAreaTitle}>{campo.nome}</p>
            <TextField
              placeholder=""
              multiline
              fullWidth
              inputProps={{
                style: {
                  minHeight: '163px',
                },
              }}
              onChange={(e) => handleTextAreaChange(campo.id, e.target.value)}
            />
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

  function handleButtonClick() {
    console.log('Titulo:' + title);
    console.log('Local selecionado:' + selectedLocation);
    console.log('Data de Inicio:' + (startDate ? dayjs(startDate).format('DD/MM/YYYY HH:mm') : 'N/A'));
    console.log('Data de Fim:' + (endDate ? dayjs(endDate).format('DD/MM/YYYY HH:mm') : 'N/A'));
    console.log('Tipo selecionado:' + selectedType);

    Object.entries(textAreaValues).forEach(([campoId, value]) => {
      console.log(`Campo de Texto (ID ${campoId}): ${value}`);
    });

    Object.entries(dateTimeValues).forEach(([campoId, value]) => {
      console.log(`Campo de Data/Hora (ID ${campoId}): ${value ? value.format('DD/MM/YYYY HH:mm') : 'N/A'}`);
    });

    Object.entries(textValues).forEach(([campoId, value]) => {
      console.log(`Campo de Texto Simples (ID ${campoId}): ${value}`);
    });
  }

  function cancelButtonClick() {
    navigate('/');
  }

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>Identificação</h1>
        <div className={classes.textFieldContainer}>
          <CustomTextField
            label="Titulo"
            required
            value={title}
            onChange={setTitle}
          />
          <CustomizedSelect<Locations_I>
            label="Local"
            required
            options={locationsData}
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
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
        </div>
        <div className={classes.marginTop}>
          <h1 className={classes.title}>Conteúdo da Reunião</h1>
          <div className={`${classes.textFieldContainer} ${classes.marginBottom}`}>
            {renderMeetingFields()}
          </div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <ButtonCustomized
          title="CANCELAR"
          color="gray"
          onClick={cancelButtonClick}
        />
        <ButtonCustomized
          title="SALVAR ATA"
          color="green"
          onClick={handleButtonClick}
        />
      </div>
    </div >
  )
}
