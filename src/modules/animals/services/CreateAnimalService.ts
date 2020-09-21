import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Animal from '../infra/typeorm/entities/Animal';
import IAnimalsRepository from '../repositories/IAnimalsRepository';

interface IRequest {
  nome_ou_brinco: string;
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
      throw new AppError('Animal com o memso nome já cadastrado');
    }

    const animal = this.animalRepository.create({
      nome_ou_brinco,
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
