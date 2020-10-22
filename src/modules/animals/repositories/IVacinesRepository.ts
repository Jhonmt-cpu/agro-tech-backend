import Vacine from '../infra/typeorm/entities/Vacine';
import ICreateVacineDTO from '../dtos/ICreateVacineDTO';
import IFindAllVacinesInMonthFromUserDTO from '../dtos/IFindAllVacinesInMonthFromUserDTO';
import IFindAllVacinesInDayFromUserDTO from '../dtos/IFindAllVacinesInDayFromUserDTO';
import IFindVacinesBeforeTodayDTO from '../dtos/IFindVacinesBeforeTodayDTO';

export default interface IVacineRepository {
  create(data: ICreateVacineDTO[]): Promise<Vacine[]>;
  findAllVacinesInMonthFromUser(
    data: IFindAllVacinesInMonthFromUserDTO,
  ): Promise<Vacine[]>;
  findAllVacinesInDayFromUser(
    data: IFindAllVacinesInDayFromUserDTO,
  ): Promise<Vacine[]>;
  findVacinesBeforeToday(data: IFindVacinesBeforeTodayDTO): Promise<Vacine[]>;
}
