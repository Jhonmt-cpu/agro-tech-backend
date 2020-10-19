import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAnimalService from '@modules/animals/services/CreateAnimalService';
import ListAllAnimalsService from '@modules/animals/services/ListAllAnimalsService';

export default class AnimalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome_ou_brinco,
      peso = null,
      nascimento = null,
      raca = null,
      sexo = 'Fêmea',
      cidade = 'Patos de Minas',
      estado = 'MG',
      anotacoes = 'Teste',
    } = request.body;

    const createAnimal = container.resolve(CreateAnimalService);

    let parsedDate = nascimento;

    if (nascimento) {
      parsedDate = parseISO(nascimento);
    }

    const animal = await createAnimal.execute({
      nome_ou_brinco,
      peso,
      nascimento: parsedDate,
      raca,
      sexo,
      cidade,
      estado,
      anotacoes,
    });

    return response.json(animal);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllAnimals = container.resolve(ListAllAnimalsService);

    const animals = await listAllAnimals.execute();

    return response.json(animals).status(204);
  }
}
