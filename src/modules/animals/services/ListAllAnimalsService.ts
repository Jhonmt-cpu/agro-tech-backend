import { injectable, inject } from 'tsyringe';

import Animal from '../infra/typeorm/entities/Animal';
import IAnimalsRepository from '../repositories/IAnimalsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllAnimalsService {
  constructor(
    @inject('AnimalsRepository')
    private animalRepository: IAnimalsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Animal[]> {
    const animals = await this.animalRepository.findAllAnimals(user_id);

    return animals;
  }
}

export default ListAllAnimalsService;
