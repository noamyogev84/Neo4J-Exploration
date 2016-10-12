import {inject} from 'aurelia-framework';
import {TransactionLogic} from '../../modules/transactionLogic';
import {Players} from '../../models/players'
import {Router} from 'aurelia-router';

@inject(TransactionLogic,Players,Router)
export class EditPlayer {

  constructor(transactionLogic,players,router) {
    this.transactions = transactionLogic;
    this.players = players;
    this.router = router;
  }

  async activate(params) {
    var res = await this.players.getPlayers();
    this.currentPlayer = res[params.id];
    console.log(this.currentPlayer);
  }

  async save() {
    console.log("save :" + JSON.stringify(this.currentPlayer));
    let res = await this.transactions.updatePlayer(this.currentPlayer);
    if(!res){};//TODO : validate return errors
    this.router.navigateBack();
  }

}
