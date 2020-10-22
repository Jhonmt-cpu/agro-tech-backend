import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateVacineService from '@modules/animals/services/CreateVacineService';

export default class VacinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      name,
      first_date,
      number_of_doses,
      period_days_bettwen_doses,
      anotacoes,
    } = request.body;

    const createVacine = container.resolve(CreateVacineService);

    const parsedDate = parseISO(first_date);

    const vacine = await createVacine.execute({
      name,
      user_id,
      first_date: parsedDate,
      number_of_doses,
      period_days_bettwen_doses,
      anotacoes,
    });

    return response.json(vacine);
  }
}
