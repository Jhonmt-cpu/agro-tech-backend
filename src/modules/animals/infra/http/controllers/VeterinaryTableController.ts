import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListVeterinaryTableService from '@modules/animals/services/ListVeterinaryTableService';

import AppError from '@shared/errors/AppError';
import { parseISO } from 'date-fns';

export default class VeterinaryTableController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { animal_id, birth_animal_date } = request.query;

    if (!birth_animal_date) {
      throw new AppError('Birth date is required');
    }

    const listVeterinaryTableService = container.resolve(
      ListVeterinaryTableService,
    );

    const vacines = await listVeterinaryTableService.execute({
      user_id,
      animal_id: String(animal_id),
      birth_animal_date: parseISO(String(birth_animal_date)),
    });

    return response.json(vacines);
  }
}
