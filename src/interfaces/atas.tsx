
export interface MeetingMinutes_I {
  id: number,
  titulo: string,
  local: string,
  dataInicio: string,
  dataFim: string,
  tipoReuniao: string,
  camposAtaReuniao: Array<MinutesField_I>,
}

export interface MinutesField_I {
  id: number,
  nome: string,
  tipo: string, // fazer enum
  valor: string
}