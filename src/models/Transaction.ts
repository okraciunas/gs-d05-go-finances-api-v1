import { uuid } from 'uuidv4';

export enum TransactionType {
  Income = 'income',
  Outcome = 'outcome',
}
export default class Transaction {
  id: string;

  title: string;

  value: number;

  type: TransactionType.Income | TransactionType.Outcome;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}
