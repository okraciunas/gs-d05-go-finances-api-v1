import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionType } from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private repository: TransactionsRepository;

  constructor(repository: TransactionsRepository) {
    this.repository = repository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.repository.getBalance();

    if (type === TransactionType.Outcome && value > balance.total) {
      throw Error('Errou!');
    }

    const transaction = this.repository.create({ title, value, type });
    return transaction;
  }
}

export default CreateTransactionService;
