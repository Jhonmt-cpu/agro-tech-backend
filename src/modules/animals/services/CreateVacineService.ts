import { startOfDay, addDays } from 'date-fns';
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Vacine from '../infra/typeorm/entities/Vacine';
import IVacinesRepository from '../repositories/IVacinesRepository';

interface IRequest {
  name: string;
  user_id: string;
  first_date: Date;
  number_of_doses: number;
  period_days_bettwen_doses: number;
  anotacoes: string;
}

@injectable()
export default class CreateDoencaService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,
  ) {}

  public async execute({
    name,
    user_id,
    first_date,
    number_of_doses,
    period_days_bettwen_doses,
    anotacoes,
  }: IRequest): Promise<Vacine[]> {
    const vacineDate = startOfDay(first_date);

    const AllVacines = Array.from({ length: number_of_doses }, (_, index) => {
      const daysToBeAdded = index * period_days_bettwen_doses;
      const date = addDays(vacineDate, daysToBeAdded);

      return {
        name,
        user_id,
        date,
        dose_number: index + 1,
        dose_period: period_days_bettwen_doses,
        anotacoes,
      };
    });

    const vacines = await this.vacinesRepository.create(AllVacines);

    return vacines;
  }
}
