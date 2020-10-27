import { injectable, inject } from 'tsyringe';

import { startOfToday } from 'date-fns';
import IVacinesRepository from '../repositories/IVacinesRepository';
import IDoencasRepository from '../repositories/IDoencasRepository';

interface IRequest {
  user_id: string;
  animal_id: string;
  birth_animal_date: Date;
}

type IResponse = Array<{
  id: string;
  name: string;
  type: string;
  date: string;
}>;

@injectable()
class ListVacinesInMonthService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,

    @inject('DoencasRepository')
    private doencasRepository: IDoencasRepository,
  ) {}

  public async execute({
    user_id,
    animal_id,
    birth_animal_date,
  }: IRequest): Promise<IResponse> {
    const today = startOfToday();

    const vacinesBeforeAndToday = await this.vacinesRepository.findVacinesBeforeToday(
      {
        user_id,
        today_date: today,
        birth_animal_date,
      },
    );

    const doencasBeforeAndToday = await this.doencasRepository.findByAnimalId(
      animal_id,
    );

    const vacinesFormated = vacinesBeforeAndToday.map(vacine => {
      const day = vacine.date.getDate();
      const month = vacine.date.getMonth() + 1;
      const year = vacine.date.getFullYear();

      const parsedDay = String(day).padStart(2, '0');
      const parsedMonth = String(month).padStart(2, '0');
      return {
        id: vacine.id,
        name: vacine.name,
        type: 'Vacina',
        date: `${year}-${parsedMonth}-${parsedDay}`,
      };
    });

    const doencasFormated = doencasBeforeAndToday.map(doenca => {
      const day = doenca.data.getDate();
      const month = doenca.data.getMonth() + 1;
      const year = doenca.data.getFullYear();

      const parsedDay = String(day).padStart(2, '0');
      const parsedMonth = String(month).padStart(2, '0');
      return {
        id: doenca.id,
        name: doenca.nome_doenca,
        type: 'Doença',
        date: `${year}-${parsedMonth}-${parsedDay}`,
      };
    });

    const veterinarTable = Array.from([...vacinesFormated, ...doencasFormated]);

    veterinarTable.sort((a, b) => (a.date > b.date ? -1 : 1));

    return veterinarTable;
  }
}

export default ListVacinesInMonthService;
