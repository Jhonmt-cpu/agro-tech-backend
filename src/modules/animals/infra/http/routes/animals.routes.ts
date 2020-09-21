import { Router } from 'express';

import AnimalsController from '../controllers/AnimalsController';

const animalRouter = Router();
const animalsController = new AnimalsController();

animalRouter.post('/', animalsController.create);

export default animalRouter;
