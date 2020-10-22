import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListVacinesInMonthService from '@modules/animals/services/ListVacinesInMonthService';

export default class UserMonthVacinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { month, year } = request.query;

    const listVacinesInMonthService = container.resolve(
      ListVacinesInMonthService,
    );

    const availability = await listVacinesInMonthService.execute({
      user_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
