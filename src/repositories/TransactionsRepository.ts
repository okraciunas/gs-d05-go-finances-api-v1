import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

export default class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        let { income, outcome } = balance;
        const { type, value } = transaction;

        if (type === TransactionType.Income) {
          income += value;
        } else if (type === TransactionType.Outcome) {
          outcome += value;
        }

        return {
          income,
          outcome,
          total: income - outcome,
        };
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}
