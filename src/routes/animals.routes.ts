import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAnimalService from '../services/CreateAnimalService';
import AnimalRepository from '../repositories/AnimalRepository';

const animalRouter = Router();

animalRouter.get('/', async (request, response) => {
  const animalRepository = getCustomRepository(AnimalRepository);
  const animals = await animalRepository.find();

  return response.json(animals);
});

animalRouter.post('/', async (request, response) => {
  const {
    nome,
    peso = null,
    nascimento = null,
    raca = null,
    sexo,
    doencas = null,
    remedios = null,
    origen_animal = null,
  } = request.body;

  const createAnimal = new CreateAnimalService();

  let parsedDate = nascimento;

  if (nascimento) {
    parsedDate = parseISO(nascimento);
  }

  try {
    const animal = await createAnimal.execute({
      nome,
      peso,
      nascimento: parsedDate,
      raca,
      sexo,
      doencas,
      remedios,
      origen_animal,
    });

    return response.json(animal);
  } catch (err) {
    return response.status(400).json(err);
  }
});

export default animalRouter;
