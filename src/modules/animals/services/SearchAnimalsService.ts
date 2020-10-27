import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IAnimalsRepository from '../repositories/IAnimalsRepository';
import Animal from '../infra/typeorm/entities/Animal';

interface IRequest {
  user_id: string;
  nome_ou_brinco?: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo?: string;
  cidade?: string;
  estado?: string;
}

@injectable()
class SearchAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalRepository: IAnimalsRepository,
  ) {}

  public async execute({
    user_id,
    nome_ou_brinco,
    peso,
    nascimento,
    raca,
    sexo,
    cidade,
    estado,
  }: IRequest): Promise<Animal[]> {
    const conditionsFiltered = [];

    if (nome_ou_brinco) {
      conditionsFiltered.push({ nome_ou_brinco });
    }

    if (peso) {
      conditionsFiltered.push({ peso });
    }

    if (nascimento) {
      conditionsFiltered.push({ nascimento });
    }

    if (raca) {
      conditionsFiltered.push({ raca });
    }

    if (sexo) {
      conditionsFiltered.push({ sexo });
    }

    if (cidade) {
      conditionsFiltered.push({ cidade });
    }

    if (estado) {
      conditionsFiltered.push({ estado });
    }

    const animals = this.animalRepository.searchAnimals({
      user_id,
      conditions: conditionsFiltered,
    });

    return animals;
  }
}

export default SearchAnimalService;
