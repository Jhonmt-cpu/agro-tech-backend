import { getRepository, Repository } from 'typeorm';

import IDoencasRepository from '@modules/doencas/repositories/IDoencasRepository';
import ICreateDoencaDTO from '@modules/doencas/dtos/ICreateDoencaDTO';
import IFindDoencaDTO from '@modules/doencas/dtos/IFindDoencaDTO';

import Doenca from '../entities/Doenca';

class DoencasRepository implements IDoencasRepository {
  private ormRepository: Repository<Doenca>;

  constructor() {
    this.ormRepository = getRepository(Doenca);
  }

  public async findByNameDateAnimalId({
    nome_doenca,
    data,
    animal_id,
  }: IFindDoencaDTO): Promise<Doenca | undefined> {
    const findDoenca = await this.ormRepository.findOne({
      where: {
        nome_doenca,
        data,
        animal_id,
      },
    });

    return findDoenca;
  }

  public async create({
    nome_doenca,
    data,
    animal_id,
    periodo_carencia,
    remedios,
    descricao,
  }: ICreateDoencaDTO): Promise<Doenca> {
    const doenca = this.ormRepository.create({
      nome_doenca,
      data,
      animal_id,
      periodo_carencia,
      remedios,
      descricao,
    });

    this.ormRepository.save(doenca);

    return doenca;
  }
}

export default DoencasRepository;
