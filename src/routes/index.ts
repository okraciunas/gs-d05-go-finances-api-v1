import { Router } from 'express';
import transactions from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactions);

export default routes;
