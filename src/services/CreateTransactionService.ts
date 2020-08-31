import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: CreateTransactionRequest): Transaction {
    if (request.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (request.value > balance.total) {
        throw new Error('Outcome not allowed.');
      }
    }

    const transaction = this.transactionsRepository.create(request);
    return transaction;
  }
}

export default CreateTransactionService;
