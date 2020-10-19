import { Router } from 'express';

import animalRouter from '@modules/animals/infra/http/routes/animals.routes';
import doencaRouter from '@modules/doencas/infra/http/routes/doencas.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/animals', animalRouter);
routes.use('/doencas', doencaRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
