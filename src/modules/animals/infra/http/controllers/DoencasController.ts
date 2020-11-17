import { Request, Response } from 'express';
import { startOfToday } from 'date-fns';
import { container } from 'tsyringe';

import CreateDoencaService from '@modules/animals/services/CreateDoencaService';
import ShowDoencaService from '@modules/animals/services/ShowDoencaService';
import UpdateDoencaService from '@modules/animals/services/UpdateDoencaService';

export default class DoencasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      nome_doenca,
      animal_id,
      descricao = null,
      remedios,
      periodo_carencia,
    } = request.body;

    const createDoenca = container.resolve(CreateDoencaService);

    const doenca = await createDoenca.execute({
      user_id,
      nome_doenca,
      animal_id,
      data: startOfToday(),
      descricao,
      remedios,
      periodo_carencia,
    });

    return response.json(doenca);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { doenca_id } = request.params;

    const showDoenca = container.resolve(ShowDoencaService);

    const doenca = await showDoenca.execute({
      doenca_id,
    });

    return response.json(doenca);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { doenca_id } = request.params;

    const { nome_doenca, remedios, descricao } = request.body;

    const updateDoenca = container.resolve(UpdateDoencaService);

    const doenca = await updateDoenca.execute({
      doenca_id,
      nome_doenca,
      descricao,
      remedios,
    });

    return response.json(doenca);
  }
}
