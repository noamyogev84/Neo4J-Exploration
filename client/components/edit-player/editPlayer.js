import {inject} from 'aurelia-framework';
import {Players} from '../../models/players'
import {Router} from 'aurelia-router';

@inject(Players,Router)
export class EditPlayer {

  constructor(players,router) {
    this.players = players;
    this.router = router;
  }

  async activate(params) {
    var res = await this.players.getPlayers();
    this.currentPlayer = res[params.id];
  }

  async save() {
    let res = await this.players.updatePlayer(this.currentPlayer);
    if(!res){};//TODO : validate return errors
    this.router.navigateBack();
  }

}
