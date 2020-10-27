import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchAnimalsService from '@modules/animals/services/SearchAnimalsService';

export default class SearchAnimalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      nome_ou_brinco,
      peso,
      nascimento,
      raca,
      sexo,
      cidade,
      estado,
    } = request.body;

    const searchAnimals = container.resolve(SearchAnimalsService);

    const parsedDate = nascimento;

    const animal = await searchAnimals.execute({
      nome_ou_brinco,
      peso,
      user_id,
      nascimento: parsedDate,
      raca,
      sexo,
      cidade,
      estado,
    });

    return response.json(animal);
  }
}
