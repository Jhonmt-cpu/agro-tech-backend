import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AnimalsController from '../controllers/AnimalsController';

const animalsRouter = Router();
const animalsController = new AnimalsController();

animalsRouter.use(ensureAuthenticated);

animalsRouter.post('/', animalsController.create);
animalsRouter.get('/', animalsController.index);

export default animalsRouter;
