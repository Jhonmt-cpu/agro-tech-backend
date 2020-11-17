import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IVacinesRepository from '../repositories/IVacinesRepository';

import Vacine from '../infra/typeorm/entities/Vacine';

interface IRequest {
  user_id: string;
  vacine_id: string;
  name: string;
  anotacoes: string;
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
    name,
    anotacoes,
  }: IRequest): Promise<Vacine> {
    const vacine = await this.vacinesRepository.findVacine({
      user_id,
      vacine_id,
    });

    if (!vacine) {
      throw new AppError('Vacine does not exists');
    }

    vacine.name = name;
    vacine.anotacoes = anotacoes;

    const newVacine = await this.vacinesRepository.save(vacine);

    return newVacine;
  }
}

export default ListVacinesInDayService;
