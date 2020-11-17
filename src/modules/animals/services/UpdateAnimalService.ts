import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAnimalsRepository from '../repositories/IAnimalsRepository';

import Animal from '../infra/typeorm/entities/Animal';

interface IRequest {
  animal_id: string;
  user_id: string;
  nome_ou_brinco: string;
  peso: string;
  anotacoes: string;
}

@injectable()
class UpdateAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({
    animal_id,
    user_id,
    nome_ou_brinco,
    peso,
    anotacoes,
  }: IRequest): Promise<Animal> {
    const animal = await this.animalsRepository.findById(animal_id);

    if (!animal) {
      throw new AppError('Animal does not exists');
    }

    if (animal.user_id !== user_id) {
      throw new AppError('This animal is not yours');
    }

    if (animal.nome_ou_brinco !== nome_ou_brinco) {
      const animalWithNameToBeUpdated = await this.animalsRepository.findByNameOrEaring(
        user_id,
        nome_ou_brinco,
      );

      if (animalWithNameToBeUpdated) {
        throw new AppError('Name/Earing alredy used');
      }
    }

    animal.nome_ou_brinco = nome_ou_brinco;
    animal.peso = Number(peso);
    animal.anotacoes = anotacoes;

    const newAnimal = await this.animalsRepository.save(animal);

    return newAnimal;
  }
}

export default UpdateAnimalService;
