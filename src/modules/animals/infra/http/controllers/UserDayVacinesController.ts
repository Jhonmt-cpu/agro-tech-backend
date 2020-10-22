import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListVacinesInDayService from '@modules/animals/services/ListVacinesInDayService';

export default class UserDayVacinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listVacinesInDayService = container.resolve(ListVacinesInDayService);

    const vacines = await listVacinesInDayService.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(vacines));
  }
}
