import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const router = Router();
const repository = new TransactionsRepository();

// router.get('/', (request, response) => {
//   // return response.json(repository.);
// });

router.post('/', (request, response) => {
  const { title, value, type } = request.body;
  const createTransaction = new CreateTransactionService(repository);
  const transaction = createTransaction.execute({ title, value, type });

  return response.json(transaction);
});

export default router;
