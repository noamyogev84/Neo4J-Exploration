import {inject, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Players} from '../../models/players';

@inject(Players,Router,BindingEngine)
export class PlayersGrid {

  constructor(playersProvider,router,bindingEngine) {
    this.router = router;
    this._playersProvider = playersProvider;
    this._bindingEngine = bindingEngine;
    this._players = [];
    this._subscription = this._bindingEngine.collectionObserver(this._players)
      .subscribe(this.collectionChanged);
  }

  async activate() {
    await this._playersProvider.initialize();
    this._players = this._playersProvider.players;
  }

  edit(player) {
    this.router.navigate("edit-player/" + player);
  }

  async remove(playerId) {
    let res = await this._playersProvider.removePlayer(playerId);
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
