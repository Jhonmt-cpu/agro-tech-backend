import { injectable, inject } from 'tsyringe';

import IVacinesRepository from '../repositories/IVacinesRepository';

import Vacine from '../infra/typeorm/entities/Vacine';

interface IRequest {
  user_id: string;
  vacine_id: string;
}

@injectable()
class ListVacinesInDayService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,
  ) {}

  public async execute({
    user_id,
    vacine_id,
  }: IRequest): Promise<Vacine | undefined> {
    const vacine = await this.vacinesRepository.findVacine({
      user_id,
      vacine_id,
    });

    return vacine;
  }
}

export default ListVacinesInDayService;
