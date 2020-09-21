import { Router } from 'express';
import DoencasController from '../controllers/DoencasController';

const doencasRouter = Router();
const doencasController = new DoencasController();

doencasRouter.post('/', doencasController.create);

export default doencasRouter;
