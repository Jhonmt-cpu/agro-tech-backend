import { getRepository, Repository } from 'typeorm';

import IVacinesToAnimals from '@modules/animals/repositories/IVacinesToAnimalsRepository';

import VacineToAnimal from '../entities/VacineToAnimal';

class VacinesToAnimalsRepository implements IVacinesToAnimals {
  private ormRepository: Repository<VacineToAnimal>;

  constructor() {
    this.ormRepository = getRepository(VacineToAnimal);
  }

  public async findAnimalVacines(animal_id: string): Promise<string[]> {
    const vacinesToAnimals = await this.ormRepository.find({
      animal_id,
    });

    const vacinesIds = vacinesToAnimals.map(
      vacineToAnimal => vacineToAnimal.vacine_id,
    );

    return vacinesIds;
  }
}

export default VacinesToAnimalsRepository;
