import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import { isBefore, startOfToday } from 'date-fns';
import IAnimalsRepository from '../repositories/IAnimalsRepository';

interface IRequest {
  user_id: string;
  animal_id: string;
}

interface IResponse {
  nome_ou_brinco: string;
  user_id: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo: string;
  cidade: string;
  estado: string;
  carencia_state: boolean;
}

@injectable()
class ShowAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalRepository: IAnimalsRepository,
  ) {}

  public async execute({
    animal_id,
    user_id,
  }: IRequest): Promise<IResponse | undefined> {
    const animal = await this.animalRepository.findById(animal_id);

    if (animal?.user_id !== user_id) {
      throw new AppError('This animal is not yours');
    }

    const today = startOfToday();

    let carencia_state = false;

    if (isBefore(today, animal.carencia) || today === animal.carencia) {
      carencia_state = true;
    }

    const response = { ...animal, carencia_state };

    return response;
  }
}

export default ShowAnimalService;
