import { getRepository, Repository, Raw, LessThanOrEqual } from 'typeorm';

import IVacinesRepository from '@modules/animals/repositories/IVacinesRepository';
import ICreateVacineDTO from '@modules/animals/dtos/ICreateVacineDTO';
import IFindAllVacinesInMonthFromUser from '@modules/animals/dtos/IFindAllVacinesInMonthFromUserDTO';
import IFindAllVacinesInDayFromUser from '@modules/animals/dtos/IFindAllVacinesInDayFromUserDTO';
import IFindVacinesBeforeTodayDTO from '@modules/animals/dtos/IFindVacinesBeforeTodayDTO';

import Vacine from '../entities/Vacine';

class DoencasRepository implements IVacinesRepository {
  private ormRepository: Repository<Vacine>;

  constructor() {
    this.ormRepository = getRepository(Vacine);
  }

  public async create(data: ICreateVacineDTO[]): Promise<Vacine[]> {
    const vacines = this.ormRepository.create(
      data.map(vacine => ({
        name: vacine.name,
        user_id: vacine.user_id,
        dose_number: vacine.dose_number,
        doses_period: vacine.dose_period,
        date: vacine.date,
        anotacoes: vacine.anotacoes,
      })),
    );

    this.ormRepository.save(vacines);

    return vacines;
  }

  public async findAllVacinesInMonthFromUser({
    user_id,
    month,
    year,
  }: IFindAllVacinesInMonthFromUser): Promise<Vacine[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const vacines = await this.ormRepository.find({
      where: {
        user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return vacines;
  }

  public async findAllVacinesInDayFromUser({
    user_id,
    day,
    month,
    year,
  }: IFindAllVacinesInDayFromUser): Promise<Vacine[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const vacines = await this.ormRepository.find({
      where: {
        user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return vacines;
  }

  public async findVacinesBeforeToday({
    user_id,
    date,
  }: IFindVacinesBeforeTodayDTO): Promise<Vacine[]> {
    // const parsedDay = String(day).padStart(2, '0');
    // const parsedMonth = String(month).padStart(2, '0');

    const vacines = await this.ormRepository.find({
      where: {
        user_id,
        date: LessThanOrEqual(date),
      },
    });

    return vacines;
  }
}

export default DoencasRepository;
