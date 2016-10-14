import {Players} from './models/players';
import {inject, BindingEngine} from 'aurelia-framework';

@inject(Players)
export class App {

  constructor(playersProvider) {
    this._players = playersProvider;
  }

  async activate() {
    this._playersCount = await this._players.getPlayersCount();
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:"home", moduleId:"components/players/playersGrid",
        title:"Home", nav:true},

      { route:["", "players"], moduleId:"components/players/playersGrid",
        title:"Players", nav:true, settings: {showCount:true}},

      { route:"add-player", moduleId:"components/add-player/addPlayer",
        title:"Add Player", nav:true},


      { route:"edit-player/:id", moduleId:"components/edit-player/editPlayer",
      title:"Edit Player", nav:false}

    ]);
  }

}
