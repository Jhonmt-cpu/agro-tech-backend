import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAnimalsRepository from '../repositories/IAnimalsRepository';

interface IRequest {
  user_id: string;
  animal_id: string;
}

@injectable()
class DeleteAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalRepository: IAnimalsRepository,
  ) {}

  public async execute({ user_id, animal_id }: IRequest): Promise<void> {
    const animalToBeDeleted = await this.animalRepository.findById(animal_id);

    if (!animalToBeDeleted) {
      throw new AppError('Animal does not exists');
    }

    if (animalToBeDeleted.user_id !== user_id) {
      throw new AppError('This animal is not yours to be deleted');
    }

    await this.animalRepository.delete(animal_id);
  }
}

export default DeleteAnimalService;
