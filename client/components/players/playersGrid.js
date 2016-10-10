import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {TransactionLogic} from '../../modules/transactionLogic';
import {Player} from '../../models/player';

@inject(TransactionLogic,Router)
export class PlayersGrid {

  constructor(transactionLogic,router) {
    this.transactions = transactionLogic;
    this.router = router;
  }

  async activate() {
    this.players = await this.transactions.getAllPlayers();
  }

  edit(player) {
    this.router.navigate("edit-player/" + player);
  }

  generateRandomAvatar() {
    let num = Math.floor(Math.random() * 5 + 1);
    return "media/small/" + num + ".jpg";
  }
}
