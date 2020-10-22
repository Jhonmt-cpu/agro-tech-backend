import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAnimalsRepository from '@modules/animals/repositories/IAnimalsRepository';
import AnimalsRepository from '@modules/animals/infra/typeorm/repositories/AnimalsRepository';

import IDoencasRepository from '@modules/animals/repositories/IDoencasRepository';
import DoencasRepository from '@modules/animals/infra/typeorm/repositories/DoencasRepository';

import IVacinesRepository from '@modules/animals/repositories/IVacinesRepository';
import VacinesRepository from '@modules/animals/infra/typeorm/repositories/VacinesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAnimalsRepository>(
  'AnimalsRepository',
  AnimalsRepository,
);

container.registerSingleton<IDoencasRepository>(
  'DoencasRepository',
  DoencasRepository,
);

container.registerSingleton<IVacinesRepository>(
  'VacinesRepository',
  VacinesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
