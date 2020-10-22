import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListVeterinaryTableService from '@modules/animals/services/ListVeterinaryTableService';

export default class VeterinaryTableController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { animal_id } = request.query;

    const listVeterinaryTableService = container.resolve(
      ListVeterinaryTableService,
    );

    const vacines = await listVeterinaryTableService.execute({
      user_id,
      animal_id: String(animal_id),
    });

    return response.json(vacines);
  }
}
