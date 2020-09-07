import { getCustomRepository } from 'typeorm';

import Animal from '../models/Animal';
import AnimalRepository from '../repositories/AnimalRepository';

interface Request {
  nome: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo: string;
  doencas?: string;
  remedios?: string;
  origen_animal?: string;
}

class CreateAnimalService {
  public async execute({
    nome,
    peso,
    nascimento,
    raca,
    sexo,
    doencas,
    remedios,
    origen_animal,
  }: Request): Promise<Animal> {
    const animalRepository = getCustomRepository(AnimalRepository);

    const findAnimalWithSameName = await animalRepository.findByName(nome);

    if (findAnimalWithSameName) {
      throw new Error('Animal com o memso nome já cadastrado');
    }

    const animal = animalRepository.create({
      nome,
      peso,
      nascimento,
      raca,
      sexo,
      doencas,
      remedios,
      origen_animal,
    });

    await animalRepository.save(animal);

    return animal;
  }
}

export default CreateAnimalService;
