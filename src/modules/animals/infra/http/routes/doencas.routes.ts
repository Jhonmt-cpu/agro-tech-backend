import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import DoencasController from '../controllers/DoencasController';

const doencasRouter = Router();
const doencasController = new DoencasController();

doencasRouter.use(ensureAuthenticated);

doencasRouter.post('/', doencasController.create);
doencasRouter.get('/:doenca_id', doencasController.show);
doencasRouter.patch('/:doenca_id', doencasController.update);

export default doencasRouter;
