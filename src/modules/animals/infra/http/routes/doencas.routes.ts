import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import DoencasController from '../controllers/DoencasController';

const doencasRouter = Router();
const doencasController = new DoencasController();

doencasRouter.use(ensureAuthenticated);

doencasRouter.post('/', doencasController.create);

export default doencasRouter;
