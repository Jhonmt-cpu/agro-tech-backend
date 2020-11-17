import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import VacinesController from '../controllers/VacinesController';
import UserMonthVacinesControler from '../controllers/UserMonthVacinesController';
import UserDayVacinesControler from '../controllers/UserDayVacinesController';

const vacinesRouter = Router();
const vacinesController = new VacinesController();
const userMonthVacinesControler = new UserMonthVacinesControler();
const userDayVacinesControler = new UserDayVacinesControler();

vacinesRouter.use(ensureAuthenticated);

vacinesRouter.post('/', vacinesController.create);

vacinesRouter.get('/', vacinesController.index);

vacinesRouter.get('/day-vacines', userDayVacinesControler.index);

vacinesRouter.get('/show-vacine/:vacine_id', vacinesController.show);

vacinesRouter.get(
  '/month-availability/:user_id',
  userMonthVacinesControler.index,
);

vacinesRouter.patch('/:vacine_id', vacinesController.update);

export default vacinesRouter;
