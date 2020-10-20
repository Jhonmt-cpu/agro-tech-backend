import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAnimalsRepository from '../repositories/IAnimalsRepository';
import Animal from '../infra/typeorm/entities/Animal';

interface IRequest {
  nome_ou_brinco: string;
  user_id: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo: string;
  cidade: string;
  estado: string;
  anotacoes?: string;
}

@injectable()
class CreateAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalRepository: IAnimalsRepository,
  ) {}

  public async execute({
    nome_ou_brinco,
    user_id,
    peso,
    nascimento,
    raca,
    sexo,
    cidade,
    estado,
    anotacoes,
  }: IRequest): Promise<Animal> {
    const findAnimalWithSameName = await this.animalRepository.findByNameOrEaring(
      nome_ou_brinco,
    );

    if (findAnimalWithSameName) {
      throw new AppError('Animal with same name or earing alredy registered');
    }

    const animal = this.animalRepository.create({
      nome_ou_brinco,
      user_id,
      peso,
      nascimento,
      raca,
      sexo,
      cidade,
      estado,
      anotacoes,
    });

    return animal;
  }
}

export default CreateAnimalService;
