import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const router = Router();
const repository = new TransactionsRepository();

router.get('/', (request, response) => {
  const transactions = repository.all();
  const balance = repository.getBalance();

  return response.json({ transactions, balance });
});

router.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransaction = new CreateTransactionService(repository);
    const transaction = createTransaction.execute({ title, value, type });

    return response.json(transaction);
  } catch ({ message }) {
    return response.status(400).json({ error: message });
  }
});

export default router;
