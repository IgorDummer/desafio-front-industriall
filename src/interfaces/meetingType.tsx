
export interface MeetingType_I {
  id: number,
  nome: string,
  campos: Array<MeetingFields_I>,
}

export interface MeetingFields_I {
  id: number,
  tipo: string,
  nome: string,
}