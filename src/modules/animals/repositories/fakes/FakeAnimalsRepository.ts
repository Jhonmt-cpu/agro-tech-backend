import { v4 as uuid } from 'uuid';

import IAnimalsRepository from '@modules/animals/repositories/IAnimalsRepository';
import ICreateAnimalDTO from '@modules/animals/dtos/ICreateAnimalDTO';

import Animal from '../../infra/typeorm/entities/Animal';

class FakeAnimalsRepository implements IAnimalsRepository {
  private animals: Animal[] = [];

  public async findByNameOrEaring(
    nome_ou_brinco: string,
  ): Promise<Animal | undefined> {
    const findAnimal = this.animals.find(
      animal => animal.nome_ou_brinco === nome_ou_brinco,
    );

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
    const animal = new Animal();

    Object.assign(animal, {
      id: uuid(),
      nome_ou_brinco,
      peso,
      nascimento,
      raca,
      sexo,
      cidade,
      estado,
      anotacoes,
    });

    this.animals.push(animal);

    return animal;
  }
}

export default FakeAnimalsRepository;
