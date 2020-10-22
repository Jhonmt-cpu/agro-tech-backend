export default interface ICreateVacineDTO {
  user_id: string;
  name: string;
  date: Date;
  dose_number: number;
  dose_period: number;
  anotacoes?: string;
}
