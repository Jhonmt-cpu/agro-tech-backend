import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateDoencaService from '@modules/animals/services/CreateDoencaService';

export default class DoencasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      nome_doenca,
      animal_id,
      data,
      descricao = null,
      remedios,
      periodo_carencia,
    } = request.body;

    const createDoenca = container.resolve(CreateDoencaService);

    const parsedDate = parseISO(data);

    const doenca = await createDoenca.execute({
      user_id,
      nome_doenca,
      animal_id,
      data: parsedDate,
      descricao,
      remedios,
      periodo_carencia,
    });

    return response.json(doenca);
  }
}
