import Animal from '../infra/typeorm/entities/Animal';
import ICreateAnimalDTO from '../dtos/ICreateAnimalDTO';
import ISearchAnimalsDTO from '../dtos/ISearchAnimalsDTO';

export default interface IAnimalsRepository {
  create(data: ICreateAnimalDTO): Promise<Animal>;
  save(data: Animal): Promise<Animal>;
  findByNameOrEaring(
    name_or_earing: string,
    user_id: string,
  ): Promise<Animal | undefined>;
  findAllAnimals(user_id: string): Promise<Animal[]>;
  findById(animal_id: string): Promise<Animal | undefined>;
  searchAnimals(data: ISearchAnimalsDTO): Promise<Animal[]>;
  delete(animal_id: string): Promise<void>;
}
