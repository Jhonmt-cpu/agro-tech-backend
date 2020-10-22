import { injectable, inject } from 'tsyringe';

import IVacinesRepository from '../repositories/IVacinesRepository';
import IDoencasRepository from '../repositories/IDoencasRepository';

interface IRequest {
  user_id: string;
  animal_id: string;
}

type IResponse = Array<{
  name: string;
  type: string;
  date: Date;
}>;

@injectable()
class ListVacinesInMonthService {
  constructor(
    @inject('VacinesRepository')
    private vacinesRepository: IVacinesRepository,

    @inject('DoencasRepository')
    private doencasRepository: IDoencasRepository,
  ) {}

  public async execute({ user_id, animal_id }: IRequest): Promise<IResponse> {
    const today = new Date();

    const vacinesBeforeAndToday = await this.vacinesRepository.findVacinesBeforeToday(
      {
        user_id,
        date: today,
      },
    );

    const doencasBeforeAndToday = await this.doencasRepository.findByAnimalId(
      animal_id,
    );

    const vacinesFormated = vacinesBeforeAndToday.map(vacine => {
      return {
        name: vacine.name,
        type: 'Vacina',
        date: vacine.date,
      };
    });

    const doencasFormated = doencasBeforeAndToday.map(doenca => {
      return {
        name: doenca.nome_doenca,
        type: 'Doença',
        date: doenca.created_at,
      };
    });

    const veterinarTable = Array.from([...vacinesFormated, ...doencasFormated]);

    veterinarTable.sort((a, b) => (a.date > b.date ? -1 : 1));

    return veterinarTable;
  }
}

export default ListVacinesInMonthService;
