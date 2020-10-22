import { injectable, inject } from 'tsyringe';

import IVacinesRepository from '../repositories/IVacinesRepository';

import Vacine from '../infra/typeorm/entities/Vacine';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListVacinesInDayService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,
  ) {}

  public async execute({
    user_id,
    day,
    year,
    month,
  }: IRequest): Promise<Vacine[]> {
    const vacines = await this.vacinesRepository.findAllVacinesInDayFromUser({
      user_id,
      day,
      year,
      month,
    });

    return vacines;
  }
}

export default ListVacinesInDayService;
