import Vacine from '../infra/typeorm/entities/Vacine';
import ICreateVacineDTO from '../dtos/ICreateVacineDTO';
import IFindVacineDTO from '../dtos/IFindVacineDTO';
import IFindAllVacinesInMonthFromUserDTO from '../dtos/IFindAllVacinesInMonthFromUserDTO';
import IFindAllVacinesInDayFromUserDTO from '../dtos/IFindAllVacinesInDayFromUserDTO';
import IFindVacinesBeforeTodayDTO from '../dtos/IFindVacinesBeforeTodayDTO';
import IEditVacineDTO from '../dtos/IEditVacineDTO';

export default interface IVacineRepository {
  create(data: ICreateVacineDTO): Promise<Vacine[]>;
  findAllVacinesInMonthFromUser(
    data: IFindAllVacinesInMonthFromUserDTO,
  ): Promise<Vacine[]>;
  findAllVacinesInDayFromUser(
    data: IFindAllVacinesInDayFromUserDTO,
  ): Promise<Vacine[]>;
  findVacinesBeforeToday(data: IFindVacinesBeforeTodayDTO): Promise<Vacine[]>;
  listAllVacines(user_id: string): Promise<Vacine[]>;
  findVacine(data: IFindVacineDTO): Promise<Vacine | undefined>;
  save(data: IEditVacineDTO): Promise<Vacine>;
}
