import {inject, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Players} from '../../models/players';

@inject(Players,Router,BindingEngine)
export class PlayersGrid {

  constructor(playersProvider,router,bindingEngine) {
    this.router = router;
    this.playersProvider = playersProvider;
    this._bindingEngine = bindingEngine;
    this._players = [];
    this._subscription = this._bindingEngine.collectionObserver(this._players)
      .subscribe(this.collectionChanged);
  }

  async activate() {
    var res = await this.playersProvider.getPlayers();
    this._players = res;
  }

  edit(player) {
    this.router.navigate("edit-player/" + player);
  }

  async remove(player) {
    let res = await this.playersProvider.removePlayer(player);
    if(!res)
      console.log("modal here " + res);
  }

  generatePlayerAvatar(playerId) {
    let num = (playerId % 5) + 1;
    return "media/small/" + num + ".jpg";
  }

  collectionChanged(splices) {
    console.log("collection changed" + JSON.stringify(splices));
  }

  deactivate() {
    this._subscription.dispose();
  }
}
