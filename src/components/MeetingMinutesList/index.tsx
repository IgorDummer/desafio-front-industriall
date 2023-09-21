import { useState, useEffect } from 'react';
import api from '../../services/api';

import classes from './meetingMinutesList.module.css';
import { MeetingMinutes_I } from '../../interfaces/atas';
import MinuteCard from '../MinuteCard';

export default function MeetingMinutesList() {
  const [groupedAtas, setGroupedAtas] = useState<{ [key: string]: MeetingMinutes_I[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  async function getAtas() {
    try {
      const response = await api.get('/Atas');
      const atasData = response.data as MeetingMinutes_I[];

      // Ordenar os dados aqui
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
      // Se os tipos forem iguais, compare as datas de início
      if (ataA.dataInicio < ataB.dataInicio) {
        return 1; // Ordenar da mais recente para a mais antiga
      }
      if (ataA.dataInicio > ataB.dataInicio) {
        return -1;
      }
      return 0;
    });
  }

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
        <p>Loading...</p>
      ) : objectKeys.length === 0 ? (
        <p>Nenhuma ata cadastrada.</p>
      ) : (
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
