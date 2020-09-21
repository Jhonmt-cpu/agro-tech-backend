import AppError from '@shared/errors/AppError';
import FakeAnimalsRepository from '../repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from './CreateAnimalService';

describe('CreateAnimal', () => {
  it('should be able to create a new animal', async () => {
    const fakeAnimalsRepository = new FakeAnimalsRepository();
    const createAnimal = new CreateAnimalService(fakeAnimalsRepository);

    const animal = await createAnimal.execute({
      nome_ou_brinco: 'mimosa',
      peso: 150,
      sexo: 'fêmea',
      nascimento: new Date(),
      cidade: 'Patos de Minas',
      estado: 'MG',
      anotacoes: 'teste, teste, teste',
      raca: 'Nelore',
    });

    expect(animal).toHaveProperty('id');
    expect(animal.peso).toBe(150);
    expect(animal.sexo).toBe('fêmea');
    expect(animal.cidade).toBe('Patos de Minas');
    expect(animal.estado).toBe('MG');
    expect(animal.anotacoes).toBe('teste, teste, teste');
    expect(animal.raca).toBe('Nelore');
  });

  it('should not be able to create a new animal with the same name/eraring', async () => {
    const fakeAnimalsRepository = new FakeAnimalsRepository();
    const createAnimal = new CreateAnimalService(fakeAnimalsRepository);

    await createAnimal.execute({
      nome_ou_brinco: 'mimosa',
      peso: 150,
      sexo: 'fêmea',
      nascimento: new Date(),
      cidade: 'Patos de Minas',
      estado: 'MG',
      anotacoes: 'teste, teste, teste',
      raca: 'Nelore',
    });

    expect(
      createAnimal.execute({
        nome_ou_brinco: 'mimosa',
        peso: 150,
        sexo: 'fêmea',
        nascimento: new Date(),
        cidade: 'Patos de Minas',
        estado: 'MG',
        anotacoes: 'teste, teste, teste',
        raca: 'Nelore',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
