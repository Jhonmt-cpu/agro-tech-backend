import AppError from '@shared/errors/AppError';

import FakeDoencasRepository from '../repositories/fakes/FakeDoencasRepository';
import FakeAnimalsRepository from '../repositories/fakes/FakeAnimalsRepository';
import CreateDoencaService from './CreateDoencaService';

let fakeDoencasRepository: FakeDoencasRepository;
let fakeAnimalsRepository: FakeAnimalsRepository;
let createDoenca: CreateDoencaService;

describe('CreateDoenca', () => {
  beforeEach(() => {
    fakeDoencasRepository = new FakeDoencasRepository();
    fakeAnimalsRepository = new FakeAnimalsRepository();
    createDoenca = new CreateDoencaService(
      fakeDoencasRepository,
      fakeAnimalsRepository,
    );
  });

  it('should be able to create a new desease', async () => {
    const animal = await fakeAnimalsRepository.create({
      nome_ou_brinco: 'mimosa',
      user_id: 'user_id',
      peso: 150,
      sexo: 'fêmea',
      nascimento: new Date(),
      cidade: 'Patos de Minas',
      estado: 'MG',
      anotacoes: 'teste, teste, teste',
      raca: 'Nelore',
    });

    const doenca = await createDoenca.execute({
      nome_doenca: 'Doença teste',
      animal_id: animal.id,
      data: new Date(),
      descricao: 'teste, teste, teste',
      remedios: 'Dipirona',
      periodo_carencia: 5,
    });

    expect(doenca).toHaveProperty('id');
    expect(doenca.nome_doenca).toBe('Doença teste');
    expect(doenca.animal_id).toBe(animal.id);
    expect(doenca.descricao).toBe('teste, teste, teste');
    expect(doenca.remedios).toBe('Dipirona');
    expect(doenca.periodo_carencia).toBe(5);
  });

  it('should not be able to create a desease in non-existing animal', async () => {
    await expect(
      createDoenca.execute({
        nome_doenca: 'Doença teste',
        animal_id: 'non-existing-animal',
        data: new Date(),
        descricao: 'teste, teste, teste',
        remedios: 'Dipirona',
        periodo_carencia: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create duplicate deseases in the same animal in the same day', async () => {
    const animal = await fakeAnimalsRepository.create({
      nome_ou_brinco: 'mimosa',
      user_id: 'user_id',
      peso: 150,
      sexo: 'fêmea',
      nascimento: new Date(),
      cidade: 'Patos de Minas',
      estado: 'MG',
      anotacoes: 'teste, teste, teste',
      raca: 'Nelore',
    });

    await createDoenca.execute({
      nome_doenca: 'Doença teste',
      animal_id: animal.id,
      data: new Date(),
      descricao: 'teste, teste, teste',
      remedios: 'Dipirona',
      periodo_carencia: 5,
    });

    await expect(
      createDoenca.execute({
        nome_doenca: 'Doença teste',
        animal_id: animal.id,
        data: new Date(),
        descricao: 'teste, teste, teste',
        remedios: 'Dipirona',
        periodo_carencia: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
