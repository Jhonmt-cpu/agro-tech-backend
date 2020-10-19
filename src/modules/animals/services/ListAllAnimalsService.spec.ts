import FakeAnimalsRepository from '../repositories/fakes/FakeAnimalsRepository';
import ListAllAnimalsService from './ListAllAnimalsService';

let fakeAnimalsRepository: FakeAnimalsRepository;
let listAllanimals: ListAllAnimalsService;

describe('ListAllAnimals', () => {
  beforeEach(() => {
    fakeAnimalsRepository = new FakeAnimalsRepository();
    listAllanimals = new ListAllAnimalsService(fakeAnimalsRepository);
  });

  it('should be able to list all animals', async () => {
    const animal1 = await fakeAnimalsRepository.create({
      nome_ou_brinco: 'mimosa',
      peso: 150,
      sexo: 'fêmea',
      nascimento: new Date(),
      cidade: 'Patos de Minas',
      estado: 'MG',
      anotacoes: 'teste, teste, teste',
      raca: 'Nelore',
    });

    const animal2 = await fakeAnimalsRepository.create({
      nome_ou_brinco: 'mimosa2',
      peso: 145,
      sexo: 'fêmea',
      nascimento: new Date(),
      cidade: 'Uberlândia',
      estado: 'MG',
      anotacoes: 'teste, teste, teste teste',
      raca: 'Nelore',
    });

    const animals = await listAllanimals.execute();

    expect(animals).toEqual([animal1, animal2]);
  });
});
