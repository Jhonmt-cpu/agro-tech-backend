import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import VeterinaryTableController from '../controllers/VeterinaryTableController';

const veterinaryTableRouter = Router();
const veterinaryTableController = new VeterinaryTableController();

veterinaryTableRouter.use(ensureAuthenticated);

veterinaryTableRouter.get('/', veterinaryTableController.show);

export default veterinaryTableRouter;
