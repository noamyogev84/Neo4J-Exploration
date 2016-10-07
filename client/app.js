import {inject} from 'aurelia-framework';
import {TransactionLogic} from './transactionLogic';

@inject(TransactionLogic)
export class App {

  constructor(transactionLogic) {
    this.transactions = transactionLogic;
  }

  async activate() {
    this.players = await this.transactions.getAllPlayers();
  }

  async addNewPlayer() {
    var player = {name: "Moses",age: 1000,points: 4500};
    await this.transactions.addNewPlayer(player);
  }
}
