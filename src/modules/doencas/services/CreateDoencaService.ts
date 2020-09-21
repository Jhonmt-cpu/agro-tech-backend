import { startOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Doenca from '../infra/typeorm/entities/Doenca';
import IDoencaRepository from '../repositories/IDoencasRepository';

interface IRequest {
  nome_doenca: string;
  animal_id: string;
  data: Date;
  descricao?: string;
  remedios: string;
  periodo_carencia: number;
}

@injectable()
export default class CreateDoencaService {
  constructor(
    @inject('DoencasRepository')
    private doencasRepository: IDoencaRepository,
  ) {}

  public async execute({
    nome_doenca,
    animal_id,
    data,
    descricao,
    remedios,
    periodo_carencia,
  }: IRequest): Promise<Doenca> {
    const doencaDate = startOfDay(data);

    const findDoencaInSameDateAndAnimal = await this.doencasRepository.findByNameDateAnimalId(
      { nome_doenca, animal_id, data: doencaDate },
    );

    if (findDoencaInSameDateAndAnimal) {
      throw new AppError('Essa doença já foi cadastradada hoje nesse animal!');
    }

    const doenca = await this.doencasRepository.create({
      nome_doenca,
      animal_id,
      data: doencaDate,
      remedios,
      periodo_carencia,
      descricao,
    });

    return doenca;
  }
}
