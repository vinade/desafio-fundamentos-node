import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  private updateBalance(transaction: Transaction): void {
    if (transaction.type === 'income') {
      this.balance.income += transaction.value;
    } else {
      this.balance.outcome += transaction.value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(request: CreateTransactionRequest): Transaction {
    const transaction = new Transaction(request);

    this.transactions.push(transaction);
    this.updateBalance(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
