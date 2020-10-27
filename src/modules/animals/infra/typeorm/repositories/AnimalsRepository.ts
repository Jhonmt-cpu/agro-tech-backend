import { getRepository, Repository } from 'typeorm';

import IAnimalsRepository from '@modules/animals/repositories/IAnimalsRepository';
import ICreateAnimalDTO from '@modules/animals/dtos/ICreateAnimalDTO';

import Animal from '../entities/Animal';

interface ISearchAnimalsArrayItem {
  [key: string]: string | number | undefined;
}

interface ISearchAnimals {
  user_id: string;
  conditions: ISearchAnimalsArrayItem[];
}

class AnimalsRepository implements IAnimalsRepository {
  private ormRepository: Repository<Animal>;

  constructor() {
    this.ormRepository = getRepository(Animal);
  }

  public async findById(animal_id: string): Promise<Animal | undefined> {
    const animal = await this.ormRepository.findOne(animal_id);

    return animal;
  }

  public async findByNameOrEaring(
    user_id: string,
    nome_ou_brinco: string,
  ): Promise<Animal | undefined> {
    const findAnimal = await this.ormRepository.findOne({
      where: { nome_ou_brinco, user_id },
    });

    return findAnimal;
  }

  public async create({
    nome_ou_brinco,
    user_id,
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
      user_id,
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

  public async findAllAnimals(user_id: string): Promise<Animal[]> {
    const animals = await this.ormRepository.find({
      where: {
        user_id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return animals;
  }

  public async searchAnimals({
    user_id,
    conditions,
  }: ISearchAnimals): Promise<Animal[]> {
    let animals = [];
    if (conditions.length === 0) {
      animals = await this.ormRepository.find({
        where: {
          user_id,
        },
      });
    } else {
      const conditionsParsed = conditions.map((condition, arrayIndex) => {
        const index = Object.keys(condition)[0];
        if (arrayIndex === 0) {
          return `${index}='${condition[index]}' `;
        }
        return `AND ${index}='${condition[index]}' `;
      });

      let query = '';

      conditionsParsed.forEach(conditionParsed => {
        query = `${query} ${conditionParsed}`;
      });

      animals = await this.ormRepository.query(
        `SELECT * FROM animals WHERE user_id='${user_id}' AND ${query};`,
      );
    }

    return animals;
  }

  public async save(animal: Animal): Promise<Animal> {
    const animalUpdated = await this.ormRepository.save(animal);

    return animalUpdated;
  }
}

export default AnimalsRepository;
