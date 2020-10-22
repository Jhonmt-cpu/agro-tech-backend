import { Router } from 'express';

import animalRouter from '@modules/animals/infra/http/routes/animals.routes';
import doencaRouter from '@modules/animals/infra/http/routes/doencas.routes';
import vacinesRouter from '@modules/animals/infra/http/routes/vacines.routes';
import veterinaryTableRouter from '@modules/animals/infra/http/routes/veterinaryTable.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/animals', animalRouter);
routes.use('/doencas', doencaRouter);
routes.use('/vacines', vacinesRouter);
routes.use('/veterinary-table', veterinaryTableRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

export default routes;
