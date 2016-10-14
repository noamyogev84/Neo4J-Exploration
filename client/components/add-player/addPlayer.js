import {Players} from '../../models/players';
import {inject} from 'aurelia-framework';
import {semanticUI} from 'semantic-ui';
import {Router} from 'aurelia-router';

@inject(Players,Router)
export class AddPlayer {

  constructor(playersProvider,router) {
    this._router = router;
    this._playersProvider = playersProvider;
    this._players = [];
    this.newPlayer = {};
  }

  async activate() {
    this._players = await this._playersProvider.getPlayers();
  }

  //TODO: find out how to do something nice with this function (duplicated from playersGrid)
  generatePlayerAvatar(playerId) {
    let num = (playerId % 5) + 1;
    return "media/small/" + num + ".jpg";
  }

  async save() {
    //TODO: do some validations here
    var res = await this._playersProvider.addPlayer(this.newPlayer);
    if(!res){}
    this._router.navigate("players");
  }

}
