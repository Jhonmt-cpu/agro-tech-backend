import { Router } from 'express';

import animalRouter from '@modules/animals/infra/http/routes/animals.routes';
import doencaRouter from '@modules/doencas/infra/http/routes/doencas.routes';

const routes = Router();

routes.use('/animals', animalRouter);
routes.use('/doencas', doencaRouter);

export default routes;
