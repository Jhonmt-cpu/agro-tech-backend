import { getRepository, Repository, Raw, Between, In } from 'typeorm';

import IVacinesRepository from '@modules/animals/repositories/IVacinesRepository';
import ICreateVacineDTO from '@modules/animals/dtos/ICreateVacineDTO';
import IFindVacineDTO from '@modules/animals/dtos/IFindVacineDTO';
import IFindAllVacinesInMonthFromUser from '@modules/animals/dtos/IFindAllVacinesInMonthFromUserDTO';
import IFindAllVacinesInDayFromUser from '@modules/animals/dtos/IFindAllVacinesInDayFromUserDTO';
import IFindVacinesBeforeTodayDTO from '@modules/animals/dtos/IFindVacinesBeforeTodayDTO';

import Vacine from '../entities/Vacine';

class VacinesRepository implements IVacinesRepository {
  private ormRepository: Repository<Vacine>;

  constructor() {
    this.ormRepository = getRepository(Vacine);
  }

  public async create({
    vacinesData,
    animals,
  }: ICreateVacineDTO): Promise<Vacine[]> {
    const vacines = this.ormRepository.create(
      vacinesData.map(vacine => ({
        name: vacine.name,
        user_id: vacine.user_id,
        dose_number: vacine.dose_number,
        doses_period: vacine.dose_period,
        date: vacine.date,
        anotacoes: vacine.anotacoes,
        vacine_to_animals: animals,
      })),
    );

    this.ormRepository.save(vacines);

    return vacines;
  }

  public async findAllVacinesInMonthFromUser({
    user_id,
  }: IFindAllVacinesInMonthFromUser): Promise<Vacine[]> {
    const vacines = await this.ormRepository.find({
      where: {
        user_id,
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
    });

    return vacines;
  }

  public async findVacinesBeforeToday({
    user_id,
    vacines_ids,
    today_date,
    birth_animal_date,
  }: IFindVacinesBeforeTodayDTO): Promise<Vacine[]> {
    const vacines = await this.ormRepository.find({
      where: {
        id:
          vacines_ids.length > 0
            ? In(vacines_ids)
            : '13b1dc6f-be68-425f-b698-906421e93c73',
        user_id,
        date: Between(birth_animal_date, today_date),
      },
    });

    return vacines;
  }

  public async listAllVacines(user_id: string): Promise<Vacine[]> {
    const vacines = await this.ormRepository.find({
      where: {
        user_id,
      },
      order: {
        date: 'ASC',
      },
    });

    return vacines;
  }

  public async findVacine({
    user_id,
    vacine_id,
  }: IFindVacineDTO): Promise<Vacine | undefined> {
    const vacine = this.ormRepository.findOne({
      where: {
        user_id,
        id: vacine_id,
      },
    });

    return vacine;
  }

  public async save(vacine: Vacine): Promise<Vacine> {
    const newVacine = await this.ormRepository.save(vacine);

    return newVacine;
  }
}

export default VacinesRepository;
