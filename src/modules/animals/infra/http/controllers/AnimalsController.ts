import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAnimalService from '@modules/animals/services/CreateAnimalService';
import ListAllAnimalsService from '@modules/animals/services/ListAllAnimalsService';
import ShowAnimalService from '@modules/animals/services/ShowAnimalService';
import UpdateAnimalService from '@modules/animals/services/UpdateAnimalService';
import DeleteAnimalService from '@modules/animals/services/DeleteAnimalService';

export default class AnimalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      nome_ou_brinco,
      peso = null,
      nascimento = null,
      raca = null,
      sexo,
      cidade,
      estado,
      anotacoes = '',
    } = request.body;

    const createAnimal = container.resolve(CreateAnimalService);

    let parsedDate = nascimento;

    if (nascimento) {
      parsedDate = parseISO(nascimento);
    }

    const animal = await createAnimal.execute({
      nome_ou_brinco,
      peso,
      user_id,
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
    const user_id = request.user.id;

    const listAllAnimals = container.resolve(ListAllAnimalsService);

    const animals = await listAllAnimals.execute({ user_id });

    return response.json(animals).status(204);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { animal_id } = request.params;

    const showAnimal = container.resolve(ShowAnimalService);

    const animal = await showAnimal.execute({ user_id, animal_id });

    return response.json(animal).status(204);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { animal_id } = request.params;

    const { nome_ou_brinco, peso, anotacoes } = request.body;

    const updateAnimal = container.resolve(UpdateAnimalService);

    const animal = await updateAnimal.execute({
      user_id,
      animal_id,
      nome_ou_brinco,
      peso,
      anotacoes,
    });

    return response.json(animal).status(200);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { animal_id } = request.params;

    const deleteAnimal = container.resolve(DeleteAnimalService);

    await deleteAnimal.execute({
      user_id,
      animal_id,
    });

    return response.json({ message: 'Animal deleted' }).status(200);
  }
}
