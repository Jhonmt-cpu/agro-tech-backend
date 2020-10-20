export default interface ICreateDoencaDTO {
  animal_id: string;
  nome_doenca: string;
  data: Date;
  descricao?: string;
  remedios: string;
  periodo_carencia: number;
}
