import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SearchAnimalsController from '../controllers/SearchAnimalsController';

const searchAnimalsRouter = Router();
const searchAnimalsController = new SearchAnimalsController();

searchAnimalsRouter.use(ensureAuthenticated);

searchAnimalsRouter.post('/', searchAnimalsController.create);

export default searchAnimalsRouter;
