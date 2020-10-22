import { injectable, inject } from 'tsyringe';

import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IVacinesRepository from '../repositories/IVacinesRepository';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  has_vacine: boolean;
}>;

@injectable()
class ListVacinesInMonthService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,
  ) {}

  public async execute({ user_id, year, month }: IRequest): Promise<IResponse> {
    const vacines = await this.vacinesRepository.findAllVacinesInMonthFromUser({
      user_id,
      year,
      month,
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const vacinesInDay = vacines.filter(vacine => {
        return getDate(vacine.date) === day;
      });

      return {
        day,
        has_vacine: isAfter(compareDate, new Date()) && vacinesInDay.length > 0,
      };
    });

    return availability;
  }
}

export default ListVacinesInMonthService;
