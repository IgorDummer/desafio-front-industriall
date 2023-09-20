import CustomTextField from '../common/TextField';
import CustomizedSelect from '../common/Select';
import BasicDatePicker from '../common/DateTimePicker';

import classes from './newMinutesForm.module.css';
import ButtonCustomized from '../common/Button';
import { useEffect, useState } from 'react';
import { Locations_I } from '../../interfaces/locations';
import api from '../../services/api';
import { MeetingType_I } from '../../interfaces/meetingType';

export default function NewMinutesForm() {
  const [locationsData, setLocationsData] = useState<Locations_I[]>([]);
  const [meetingTypeData, setMeetingTypeData] = useState<MeetingType_I[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<number | undefined>(undefined);

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

  useEffect(() => {
    getLocations();
    getMeetingType();
  }, []);

  function handleButtonClick() {
    console.log('Local selecionado:' + selectedLocation);
    console.log('Tipo selecionado:' + selectedType);
  }

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>Identificação</h1>
        <div className={classes.textFieldContainer}>
          <CustomTextField
            label="Titulo"
            required
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
            />
            <BasicDatePicker
              label="Data e Horário de Fim"
            />
          </div>
          <CustomizedSelect<MeetingType_I>
            label="Tipo de Reunião"
            required
            options={meetingTypeData}
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>
        <div className={`${classes.textFieldContainer} ${classes.marginTop}`}>
          <h1 className={classes.title}>Conteúdo da Reunião</h1>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <ButtonCustomized
          title="CANCELAR"
          color="gray"
          onClick={handleButtonClick}
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

