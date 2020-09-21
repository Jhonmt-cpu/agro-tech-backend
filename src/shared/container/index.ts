import { container } from 'tsyringe';

import IAnimalsRepository from '@modules/animals/repositories/IAnimalsRepository';
import AnimalsRepository from '@modules/animals/infra/typeorm/repositories/AnimalsRepository';

import IDoencasRepository from '@modules/doencas/repositories/IDoencasRepository';
import DoencasRepository from '@modules/doencas/infra/typeorm/repositories/DoencasRepository';

container.registerSingleton<IAnimalsRepository>(
  'AnimalsRepository',
  AnimalsRepository,
);

container.registerSingleton<IDoencasRepository>(
  'DoencasRepository',
  DoencasRepository,
);
