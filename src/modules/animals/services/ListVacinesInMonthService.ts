import { injectable, inject } from 'tsyringe';

import { getDate, getMonth, getYear } from 'date-fns';

import IVacinesRepository from '../repositories/IVacinesRepository';

interface IRequest {
  user_id: string;
}

type IResponse = Array<{
  day: number;
  month: number;
  year: number;
}>;

@injectable()
class ListVacinesInMonthService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const vacines = await this.vacinesRepository.findAllVacinesInMonthFromUser({
      user_id,
    });

    const availability = vacines.map(vacine => {
      return {
        day: getDate(vacine.date),
        month: getMonth(vacine.date) + 1,
        year: getYear(vacine.date),
      };
    });

    return availability;
  }
}

export default ListVacinesInMonthService;
