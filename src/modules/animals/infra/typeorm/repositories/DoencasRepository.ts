import { getRepository, Repository } from 'typeorm';

import IDoencasRepository from '@modules/animals/repositories/IDoencasRepository';
import ICreateDoencaDTO from '@modules/animals/dtos/ICreateDoencaDTO';
import IFindDoencaDTO from '@modules/animals/dtos/IFindDoencaDTO';

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

  public async findByAnimalId(animal_id: string): Promise<Doenca[]> {
    const doencas = await this.ormRepository.find({
      where: {
        animal_id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return doencas;
  }
}

export default DoencasRepository;
