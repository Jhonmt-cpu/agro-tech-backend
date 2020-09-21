import AppError from '@shared/errors/AppError';
import FakeDoencasRepository from '../repositories/fakes/FakeDoencasRepository';
import CreateDoencaService from './CreateDoencaService';

describe('CreateDoenca', () => {
  it('should be able to create a new desease', async () => {
    const fakeDoencasRepository = new FakeDoencasRepository();
    const createDoenca = new CreateDoencaService(fakeDoencasRepository);

    const doenca = await createDoenca.execute({
      nome_doenca: 'Doença teste',
      animal_id: '123456',
      data: new Date(),
      descricao: 'teste, teste, teste',
      remedios: 'Dipirona',
      periodo_carencia: 5,
    });

    expect(doenca).toHaveProperty('id');
    expect(doenca.nome_doenca).toBe('Doença teste');
    expect(doenca.animal_id).toBe('123456');
    expect(doenca.descricao).toBe('teste, teste, teste');
    expect(doenca.remedios).toBe('Dipirona');
    expect(doenca.periodo_carencia).toBe(5);
  });

  it('should not be able to create a new desease name in the same animal in the same day', async () => {
    const fakeDoencasRepository = new FakeDoencasRepository();
    const createDoenca = new CreateDoencaService(fakeDoencasRepository);

    await createDoenca.execute({
      nome_doenca: 'Doença teste',
      animal_id: '123456',
      data: new Date(),
      descricao: 'teste, teste, teste',
      remedios: 'Dipirona',
      periodo_carencia: 5,
    });

    expect(
      createDoenca.execute({
        nome_doenca: 'Doença teste',
        animal_id: '123456',
        data: new Date(),
        descricao: 'teste, teste, teste',
        remedios: 'Dipirona',
        periodo_carencia: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
