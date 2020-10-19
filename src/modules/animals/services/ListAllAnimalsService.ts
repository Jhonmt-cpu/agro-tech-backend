import { injectable, inject } from 'tsyringe';

import Animal from '../infra/typeorm/entities/Animal';
import IAnimalsRepository from '../repositories/IAnimalsRepository';

@injectable()
class ListAllAnimalsService {
  constructor(
    @inject('AnimalsRepository')
    private animalRepository: IAnimalsRepository,
  ) {}

  public async execute(): Promise<Animal[]> {
    const animals = await this.animalRepository.findAllAnimals();

    return animals;
  }
}

export default ListAllAnimalsService;
