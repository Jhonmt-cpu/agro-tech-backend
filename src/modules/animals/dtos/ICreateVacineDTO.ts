import Animal from '@modules/animals/infra/typeorm/entities/Animal';

interface IVacine {
  user_id: string;
  name: string;
  date: Date;
  dose_number: number;
  dose_period: number;
  anotacoes?: string;
}
export default interface ICreateVacineDTO {
  vacinesData: IVacine[];
  animals: Animal[];
}
