import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateVacineService from '@modules/animals/services/CreateVacineService';
import ListAllVacinesFromUserService from '@modules/animals/services/ListAllVacinesFromUserService';
import FindVacineService from '@modules/animals/services/FindVacineService';
import UpdateVacineService from '@modules/animals/services/UpdateVacineService';

export default class VacinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      name,
      first_date,
      number_of_doses = 1,
      period_days_bettwen_doses = 0,
      anotacoes,
      animalsIds,
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
      animalsIds,
    });

    return response.json(vacine);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listVacines = container.resolve(ListAllVacinesFromUserService);

    const vacines = await listVacines.execute({
      user_id,
    });

    return response.json(vacines);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { vacine_id } = request.params;

    const findVacine = container.resolve(FindVacineService);

    const vacine = await findVacine.execute({
      user_id,
      vacine_id,
    });

    return response.json(vacine);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { vacine_id } = request.params;

    const { name, anotacoes } = request.body;

    const updateVacine = container.resolve(UpdateVacineService);

    const vacine = await updateVacine.execute({
      user_id,
      vacine_id,
      name,
      anotacoes,
    });

    return response.json(vacine);
  }
}
