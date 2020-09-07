import { Router } from 'express';
import animalRouter from './animals.routes';

const routes = Router();

routes.use('/animals', animalRouter);

export default routes;
