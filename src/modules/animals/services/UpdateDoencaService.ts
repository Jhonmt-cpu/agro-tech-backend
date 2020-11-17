import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDoencasRepository from '../repositories/IDoencasRepository';

import Doenca from '../infra/typeorm/entities/Doenca';

interface IRequest {
  doenca_id: string;
  nome_doenca: string;
  remedios: string;
  descricao: string;
}

@injectable()
class UpdateDoencaService {
  constructor(
    @inject('DoencasRepository')
    private doencasRepository: IDoencasRepository,
  ) {}

  public async execute({
    doenca_id,
    nome_doenca,
    remedios,
    descricao,
  }: IRequest): Promise<Doenca> {
    const doenca = await this.doencasRepository.findById(doenca_id);

    if (!doenca) {
      throw new AppError('Vacine does not exists');
    }

    doenca.nome_doenca = nome_doenca;
    doenca.remedios = remedios;
    doenca.descricao = descricao;

    const newDoenca = await this.doencasRepository.save(doenca);

    return newDoenca;
  }
}

export default UpdateDoencaService;
