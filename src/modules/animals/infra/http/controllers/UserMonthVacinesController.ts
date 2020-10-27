import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListVacinesInMonthService from '@modules/animals/services/ListVacinesInMonthService';

export default class UserMonthVacinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listVacinesInMonthService = container.resolve(
      ListVacinesInMonthService,
    );

    const availability = await listVacinesInMonthService.execute({
      user_id,
    });

    return response.json(availability);
  }
}
