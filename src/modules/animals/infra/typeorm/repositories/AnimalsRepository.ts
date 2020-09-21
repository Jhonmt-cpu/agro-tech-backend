import { getRepository, Repository } from 'typeorm';

import IAnimalsRepository from '@modules/animals/repositories/IAnimalsRepository';
import ICreateAnimalDTO from '@modules/animals/dtos/ICreateAnimalDTO';

import Animal from '../entities/Animal';

class AnimalsRepository implements IAnimalsRepository {
  private ormRepository: Repository<Animal>;

  constructor() {
    this.ormRepository = getRepository(Animal);
  }

  public async findByNameOrEaring(
    nome_ou_brinco: string,
  ): Promise<Animal | undefined> {
    const findAnimal = await this.ormRepository.findOne({
      where: { nome_ou_brinco },
    });

    return findAnimal;
  }

  public async create({
    nome_ou_brinco,
    peso,
    nascimento,
    raca,
    sexo,
    cidade,
    estado,
    anotacoes,
  }: ICreateAnimalDTO): Promise<Animal> {
    const animal = this.ormRepository.create({
      nome_ou_brinco,
      peso,
      nascimento,
      raca,
      sexo,
      cidade,
      estado,
      anotacoes,
    });

    await this.ormRepository.save(animal);

    return animal;
  }
}

export default AnimalsRepository;
