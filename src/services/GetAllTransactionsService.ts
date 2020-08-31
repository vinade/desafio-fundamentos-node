import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionsBalanceResponse {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class GetAllTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionsBalanceResponse {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    return {
      transactions,
      balance,
    };
  }
}

export default GetAllTransactionsService;
