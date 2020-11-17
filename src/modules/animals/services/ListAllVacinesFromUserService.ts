import { injectable, inject } from 'tsyringe';

import IVacinesRepository from '../repositories/IVacinesRepository';

import Vacine from '../infra/typeorm/entities/Vacine';

interface IRequest {
  user_id: string;
}

@injectable()
class ListVacinesInDayService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Vacine[]> {
    const vacines = await this.vacinesRepository.listAllVacines(user_id);

    return vacines;
  }
}

export default ListVacinesInDayService;
