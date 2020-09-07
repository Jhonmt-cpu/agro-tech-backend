import { Repository, EntityRepository } from 'typeorm';

import Animal from '../models/Animal';

@EntityRepository(Animal)
class AnimalRepository extends Repository<Animal> {
  public async findByName(nome: string): Promise<Animal | null> {
    const findAnimal = await this.findOne({
      where: { nome },
    });

    return findAnimal || null;
  }
}

export default AnimalRepository;
