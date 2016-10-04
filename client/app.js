import {inject} from 'aurelia-framework';
import {TransactionLogic} from './transactionLogic';

@inject(TransactionLogic)
export class App {

  constructor(transactionLogic) {
    this.transactions = transactionLogic;
  }

  testBtnclick() {
    this.transactions.getAllPlayers();
  }
}
