import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IDoencasRepository from '@modules/doencas/repositories/IDoencasRepository';
import ICreateDoencaDTO from '@modules/doencas/dtos/ICreateDoencaDTO';
import IFindDoencaDTO from '@modules/doencas/dtos/IFindDoencaDTO';

import Doenca from '../../infra/typeorm/entities/Doenca';

class FakeDoencasRepository implements IDoencasRepository {
  private doencas: Doenca[] = [];

  public async findByNameDateAnimalId({
    nome_doenca,
    data,
    animal_id,
  }: IFindDoencaDTO): Promise<Doenca | undefined> {
    const findDoenca = await this.doencas.find(
      doenca =>
        doenca.nome_doenca === nome_doenca &&
        doenca.animal_id === animal_id &&
        isEqual(doenca.data, data),
    );

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
    const doenca = new Doenca();

    Object.assign(doenca, {
      id: uuid(),
      nome_doenca,
      data,
      animal_id,
      periodo_carencia,
      remedios,
      descricao,
    });

    this.doencas.push(doenca);

    return doenca;
  }
}

export default FakeDoencasRepository;
