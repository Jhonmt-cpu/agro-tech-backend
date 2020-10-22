import Doenca from '../infra/typeorm/entities/Doenca';
import ICreateDoencaDTO from '../dtos/ICreateDoencaDTO';
import IFindDoencaDTO from '../dtos/IFindDoencaDTO';

export default interface IDoencasRepository {
  create(data: ICreateDoencaDTO): Promise<Doenca>;
  findByNameDateAnimalId(data: IFindDoencaDTO): Promise<Doenca | undefined>;
  findByAnimalId(animal_id: string): Promise<Doenca[]>;
}
