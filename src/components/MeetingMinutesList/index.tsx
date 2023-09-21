import { useState, useEffect } from 'react';

import MinuteCard from '../MinuteCard';
import { MeetingMinutes_I } from '../../interfaces/atas';

import api from '../../services/api';
import classes from './meetingMinutesList.module.css';

export default function MeetingMinutesList() {
  const [groupedAtas, setGroupedAtas] = useState<{ [key: string]: MeetingMinutes_I[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  /* Faz requisição para a API para retornar as atas */
  async function getAtas() {
    try {
      const response = await api.get('/Atas');
      const atasData = response.data as MeetingMinutes_I[];

      /* Ordena as atas de acordo nome do tipo de reunião e a data de início */
      const orderedData = sortAtasByTypeAndDate(atasData);
      const groupedData = groupAtasByType(orderedData);

      setGroupedAtas(groupedData)
      setIsLoading(false);
    } catch (error) {
      console.error('Error in GET request:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAtas();
  }, []);

  function sortAtasByTypeAndDate(atas: MeetingMinutes_I[]) {
    return atas.slice().sort((ataA, ataB) => {
      if (ataA.tipoReuniao < ataB.tipoReuniao) {
        return -1;
      }
      if (ataA.tipoReuniao > ataB.tipoReuniao) {
        return 1;
      }
      /* Caso os tipos forem iguais, ordena de acordo com a data de início, 
          do mais recente para o mais antigo */
      if (ataA.dataInicio < ataB.dataInicio) {
        return 1;
      }
      if (ataA.dataInicio > ataB.dataInicio) {
        return -1;
      }
      return 0;
    });
  }

  /* Agrupa as atas de acordo com o tipo de reunião */
  function groupAtasByType(atas: MeetingMinutes_I[]) {
    const groupedAtas: { [key: string]: MeetingMinutes_I[] } = {};

    atas.forEach((ata) => {
      if (!groupedAtas[ata.tipoReuniao]) {
        groupedAtas[ata.tipoReuniao] = [];
      }
      groupedAtas[ata.tipoReuniao].push(ata);
    });

    return groupedAtas;
  }

  const objectKeys = Object.keys(groupedAtas);

  async function handleDeleteSuccess() {
    await getAtas();
  }

  return (
    <section className={classes.container}>
      {isLoading ? (
        <p className={classes.text}>Carregando...</p>
      ) : objectKeys.length === 0 ? (
        <p className={classes.text}>Nenhuma ata cadastrada.</p>
      ) : (
        /* Mapeia cada tipo de reunião, para posteriormente mapear as atas 
              e renderizar o componente do Card */
        Object.entries(groupedAtas).map(([tipoReuniao, atas], index) => (
          <div key={tipoReuniao} className={index !== objectKeys.length - 1 ? classes.minuteCard : ''}>
            <h2 className={classes.title}>{tipoReuniao}</h2>
            {atas.map((ata, indexAtas) => (
              <div key={ata.id}>
                <MinuteCard
                  id={ata.id}
                  title={ata.titulo}
                  initDate={ata.dataInicio}
                  local={ata.local}
                  onDeleteSuccess={handleDeleteSuccess}
                />
                {indexAtas !== atas.length - 1 && <hr />}
              </div>
            ))}
          </div>
        ))
      )}
    </section>
  );
}
