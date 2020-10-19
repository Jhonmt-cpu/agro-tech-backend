import { container } from 'tsyringe';

import '@modules/users/providers';

import IAnimalsRepository from '@modules/animals/repositories/IAnimalsRepository';
import AnimalsRepository from '@modules/animals/infra/typeorm/repositories/AnimalsRepository';

import IDoencasRepository from '@modules/doencas/repositories/IDoencasRepository';
import DoencasRepository from '@modules/doencas/infra/typeorm/repositories/DoencasRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAnimalsRepository>(
  'AnimalsRepository',
  AnimalsRepository,
);

container.registerSingleton<IDoencasRepository>(
  'DoencasRepository',
  DoencasRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
