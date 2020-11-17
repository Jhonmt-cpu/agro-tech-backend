import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AnimalsController from '../controllers/AnimalsController';

const animalsRouter = Router();
const animalsController = new AnimalsController();

animalsRouter.use(ensureAuthenticated);

animalsRouter.post('/', animalsController.create);
animalsRouter.get('/', animalsController.index);
animalsRouter.get('/:animal_id', animalsController.show);
animalsRouter.patch('/:animal_id', animalsController.update);
animalsRouter.delete('/:animal_id', animalsController.delete);

export default animalsRouter;
