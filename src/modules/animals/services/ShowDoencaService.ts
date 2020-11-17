import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Doenca from '../infra/typeorm/entities/Doenca';
import IDoencasRepository from '../repositories/IDoencasRepository';

interface IRequest {
  doenca_id: string;
}

@injectable()
class ShowDoencaService {
  constructor(
    @inject('DoencasRepository')
    private doencasRepository: IDoencasRepository,
  ) {}

  public async execute({ doenca_id }: IRequest): Promise<Doenca> {
    const doenca = await this.doencasRepository.findById(doenca_id);

    if (!doenca) {
      throw new AppError('Doenca does not exists');
    }

    return doenca;
  }
}

export default ShowDoencaService;
