import {inject} from 'aurelia-framework';
import {TransactionLogic} from '../../modules/transactionLogic';

@inject(TransactionLogic)
export class EditPlayer {

  constructor(transactionLogic) {
    this.transactions = transactionLogic;
  }

  async activate(params) {
    await this.getPlayerById(params.id)
  }

  async savePlayer() {
    var player = {name: this.name,age: parseInt(this.age),points: parseInt(this.points)};
    let res = await this.transactions.saveNewPlayer(player);
  }

  async getPlayerById(playerId) {
    this.player = await this.transactions.getPlayer(playerId);
  }
}
