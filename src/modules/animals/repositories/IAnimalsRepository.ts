import Animal from '../infra/typeorm/entities/Animal';
import ICreateAnimalDTO from '../dtos/ICreateAnimalDTO';

export default interface IAnimalsRepository {
  create(data: ICreateAnimalDTO): Promise<Animal>;
  findByNameOrEaring(name_or_earing: string): Promise<Animal | undefined>;
  findAllAnimals(): Promise<Animal[]>;
}
